import './Tab.scss'

function Tab({ children, isActive = false, onChangeType }) {
  return (
    <button onClick={onChangeType} className={`tab ${isActive ? 'tab-active' : ''}`}>
      {children}
    </button>
  )
}

export default Tab
