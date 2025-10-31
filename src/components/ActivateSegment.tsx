import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

const ActivateSegment = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dsp, setDsp] = useState('')
  const [channel, setChannel] = useState('')
  const [advertiser, setAdvertiser] = useState('')
  const [ioId, setIoId] = useState('')
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [referenceId, setReferenceId] = useState('')

  const generateReferenceId = () => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    return `DSP-${timestamp}-${random}`.toUpperCase()
  }

  const handlePushToDSP = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      const refId = generateReferenceId()
      setReferenceId(refId)
      setShowSuccessDialog(true)
    }, 1200)
  }

  const handleCloseDialog = () => {
    setShowSuccessDialog(false)
  }

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 ease-in-out">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Activate Your Segment</h2>
      </div>
      
      <div className="mt-6 space-y-4 transition-all duration-500 ease-in-out">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap', alignItems: 'center' }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel id="dsp-select-label">DSP</InputLabel>
            <Select
              labelId="dsp-select-label"
              value={dsp}
              label="DSP"
              onChange={(e) => setDsp(e.target.value)}
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="TTD">TTD</MenuItem>
              <MenuItem value="DV360">DV360</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel id="channel-select-label">Channel</InputLabel>
            <Select
              labelId="channel-select-label"
              value={channel}
              label="Channel"
              onChange={(e) => setChannel(e.target.value)}
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="CTV">CTV</MenuItem>
              <MenuItem value="Youtube">Youtube</MenuItem>
              <MenuItem value="OLV">OLV</MenuItem>
              <MenuItem value="Display">Display</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel id="advertiser-select-label">Advertiser</InputLabel>
            <Select
              labelId="advertiser-select-label"
              value={advertiser}
              label="Advertiser"
              onChange={(e) => setAdvertiser(e.target.value)}
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="Advertiser 1">Advertiser 1</MenuItem>
              <MenuItem value="Advertiser 2">Advertiser 2</MenuItem>
              <MenuItem value="Advertiser 3">Advertiser 3</MenuItem>
              <MenuItem value="Advertiser 4">Advertiser 4</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel id="io-id-select-label">IO ID</InputLabel>
            <Select
              labelId="io-id-select-label"
              value={ioId}
              label="IO ID"
              onChange={(e) => setIoId(e.target.value)}
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="IO-001">IO-001</MenuItem>
              <MenuItem value="IO-002">IO-002</MenuItem>
              <MenuItem value="IO-003">IO-003</MenuItem>
              <MenuItem value="IO-004">IO-004</MenuItem>
              <MenuItem value="IO-005">IO-005</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <button 
          onClick={handlePushToDSP}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-3 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              Push to DSP
              <span className="spinner"></span>
            </>
          ) : (
            'Push to DSP'
          )}
        </button>
      </div>

      {/* Success Dialog */}
      <Dialog 
        open={showSuccessDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Segment Activation Successful
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            <AlertTitle>Successfully Pushed to DSP</AlertTitle>
            Your segment has been successfully activated and pushed to the DSP platform.
          </Alert>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Reference ID:
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'monospace',
                backgroundColor: '#f5f5f5',
                padding: 1,
                borderRadius: 1,
                border: '1px solid #e0e0e0'
              }}
            >
              {referenceId}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Configuration Details:
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>DSP:</strong> {dsp || 'Not specified'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Channel:</strong> {channel || 'Not specified'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Advertiser:</strong> {advertiser || 'Not specified'}
              </Typography>
              <Typography variant="body2">
                <strong>IO ID:</strong> {ioId || 'Not specified'}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}

export default ActivateSegment