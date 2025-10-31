import { useState, useEffect } from 'react';

// Raw sheet data has dynamic property names, so we'll use any
// The actual properties are:
// - 'Fresh Expressors Province' or 'Gen Z Fresh Explorers Province'
// - 'Geo'
// - 'Socially active individuals...Population' or 'Gen Z and young adults...Population'
// - 'Commerce Segment'
// - '  Composite Score' or 'Composite Score'

interface ProcessedProvinceData {
  province: string;
  avgScore: number;
  totalPopulation: number;
  geoCount: number;
}

interface SheetDataHook {
  data: ProcessedProvinceData[];
  loading: boolean;
  error: string | null;
  totalAudience: number;
  totalPostalCodes: number;
}

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1fV8LKMMfcVofS5Z9Nx8dYtPlICZm8QkyRHaY8tx4dqw/gviz/tq?tqx=out:json&gid=1452605069';

export const useGoogleSheetData = (): SheetDataHook => {
  const [data, setData] = useState<ProcessedProvinceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(GOOGLE_SHEET_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('🔍 Raw response length:', text.length);
        console.log('🔍 First 200 chars of response:', text.substring(0, 200));
        console.log('🔍 Last 200 chars of response:', text.substring(text.length - 200));
        
        // Google Sheets wraps JSON in: /*O_o*/ google.visualization.Query.setResponse({...})
        // We need to extract just the JSON part
        let jsonData;
        try {
          // Method 1: Try the specific slice approach for the wrapper
          if (text.includes('google.visualization.Query.setResponse')) {
            console.log('🔍 Using Method 1: google.visualization wrapper detected');
            const jsonText = text.substring(47).slice(0, -2);
            console.log('🔍 Extracted JSON text length:', jsonText.length);
            console.log('🔍 First 100 chars of extracted JSON:', jsonText.substring(0, 100));
            jsonData = JSON.parse(jsonText);
          } else {
            console.log('🔍 Using Method 2: regex extraction');
            const jsonText = text.replace(/^.*?({.*}).*$/, '$1');
            console.log('🔍 Extracted JSON text length:', jsonText.length);
            console.log('🔍 First 100 chars of extracted JSON:', jsonText.substring(0, 100));
            jsonData = JSON.parse(jsonText);
          }
        } catch (parseError) {
          console.error('❌ JSON parsing failed:', parseError);
          console.log('🔍 Raw response text:', text.substring(0, 200) + '...');
          throw new Error(`Failed to parse Google Sheets response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }
        
        console.log('🔍 Parsed JSON structure:', {
          hasTable: !!jsonData.table,
          hasRows: !!jsonData.table?.rows,
          tableKeys: Object.keys(jsonData.table || {}),
          rowsLength: jsonData.table?.rows?.length || 0
        });

        if (!jsonData.table || !jsonData.table.rows) {
          console.error('❌ Invalid data structure:', jsonData);
          throw new Error('Invalid data structure from Google Sheets');
        }

        // Extract headers and data rows
        const headers = jsonData.table.cols.map((col: any) => col.label);
        console.log('🔍 Headers found:', headers);
        console.log('🔍 Number of columns:', jsonData.table.cols.length);
        console.log('🔍 Number of rows:', jsonData.table.rows.length);

        const rows = jsonData.table.rows.map((row: any, rowIndex: number) => {
          const rowData: any = {};
          row.c.forEach((cell: any, index: number) => {
            const header = headers[index];
            let value = cell?.v;
            
            // Convert numeric values
            if (header === 'Population' || header === 'Composite Score') {
              value = value ? parseFloat(value) : 0;
            }
            
            rowData[header] = value || '';
          });
          
          // Log first few rows for debugging
          if (rowIndex < 3) {
            console.log(`🔍 Row ${rowIndex}:`, rowData);
          }
          
          return rowData;
        });

        console.log('✅ Successfully parsed Google Sheets data:', {
          totalRows: rows.length,
          headers: headers,
          sampleRow: rows[0],
          firstFewRows: rows.slice(0, 3)
        });

        // Filter out rows with missing essential data
        // Use the actual header names from the data
        const validRows = rows.filter((row: any) => {
          const hasProvince = row['Fresh Expressors Province'] || row['Gen Z Fresh Explorers Province'];
          const hasGeo = row['Geo'];
          const hasPopulation = row['Socially active individuals who see gum as a confidence booster and personal care essential. Often purchase mint or fruity gum before social events or commutes. High engagement on Instagram and TikTok, follow grooming and lifestyle influencers Population'] || 
                            row['Gen Z and young adults (age 15-32), including students and young professionals, motivated by originality and freshness, they value wellness, convenience, fun, and innovative flavors They seek sugar-free and trending novelty gum flavors Population'];
          const hasScore = row['  Composite Score'] || row['Composite Score'];
          
          return hasProvince && hasGeo && hasPopulation && hasScore;
        });

        console.log('🔍 Data filtering results:', {
          totalRows: rows.length,
          validRows: validRows.length,
          invalidRows: rows.length - validRows.length,
          sampleValidRow: validRows[0],
          sampleInvalidRow: rows.find(row => !row.Province || !row.Geo || typeof row.Population !== 'number' || typeof row['Composite Score'] !== 'number')
        });

        // Process the data
        const processedData = processSheetData(validRows);
        console.log('🔍 Processed data:', processedData);
        setData(processedData);

      } catch (err) {
        console.error('Error fetching Google Sheet data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  // Calculate totals
  const totalAudience = data.reduce((sum, province) => sum + province.totalPopulation, 0);
  const totalPostalCodes = data.reduce((sum, province) => sum + province.geoCount, 0);

  return {
    data,
    loading,
    error,
    totalAudience,
    totalPostalCodes,
  };
};

const processSheetData = (rawData: any[]): ProcessedProvinceData[] => {
  console.log('🔍 Processing sheet data with', rawData.length, 'rows');
  console.log('🔍 Sample raw data:', rawData.slice(0, 2));

  // Group data by province
  const groupedByProvince = rawData.reduce((acc, row) => {
    // Get province from either Fresh Expressors or Gen Z Fresh Explorers
    const province = row['Fresh Expressors Province'] || row['Gen Z Fresh Explorers Province'];
    
    if (!province) return acc; // Skip if no province found
    
    if (!acc[province]) {
      acc[province] = {
        populations: [],
        scores: [],
        geoCodes: new Set(),
      };
    }
    
    // Get population from either Fresh Expressors or Gen Z Fresh Explorers
    const population = row['Socially active individuals who see gum as a confidence booster and personal care essential. Often purchase mint or fruity gum before social events or commutes. High engagement on Instagram and TikTok, follow grooming and lifestyle influencers Population'] || 
                     row['Gen Z and young adults (age 15-32), including students and young professionals, motivated by originality and freshness, they value wellness, convenience, fun, and innovative flavors They seek sugar-free and trending novelty gum flavors Population'];
    
    // Get score from either Fresh Expressors or Gen Z Fresh Explorers
    const score = row['  Composite Score'] || row['Composite Score'];
    
    if (population && score) {
      acc[province].populations.push(population);
      acc[province].scores.push(score);
      acc[province].geoCodes.add(row['Geo']);
    }
    
    return acc;
  }, {} as Record<string, { populations: number[]; scores: number[]; geoCodes: Set<string> }>);

  console.log('🔍 Grouped by province:', Object.keys(groupedByProvince));
  console.log('🔍 Sample province data:', Object.entries(groupedByProvince)[0]);

  // Process each province
  const processedData: ProcessedProvinceData[] = Object.entries(groupedByProvince).map(
    ([province, data]) => {
      const totalPopulation = data.populations.reduce((sum, pop) => sum + pop, 0);
      const avgScore = data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length;
      const geoCount = data.geoCodes.size;

      console.log(`🔍 Province ${province}:`, {
        populations: data.populations,
        scores: data.scores,
        totalPopulation,
        avgScore,
        geoCount
      });

      return {
        province,
        avgScore: Math.round(avgScore * 100) / 100, // Round to 2 decimal places
        totalPopulation,
        geoCount,
      };
    }
  );

  console.log('🔍 Final processed data:', processedData);

  // Sort by province name
  return processedData.sort((a, b) => a.province.localeCompare(b.province));
};

export default useGoogleSheetData;
