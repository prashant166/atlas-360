interface ToggleSwitchProps {
  isActive: boolean
  onToggle: () => void
}

const ToggleSwitch = ({ isActive, onToggle }: ToggleSwitchProps) => {
  return (
    <div 
      className={`toggle-switch ${isActive ? 'active' : ''}`}
      onClick={onToggle}
    >
      <div className="toggle-knob"></div>
    </div>
  )
}

export default ToggleSwitch