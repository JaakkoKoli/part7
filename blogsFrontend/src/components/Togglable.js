import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <br />
        <div style={hideWhenVisible}>
          <Button onClick={this.toggleVisibility} color="black"><Icon name="unhide" /> {this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button onClick={this.toggleVisibility} color="black"><Icon name="hide" /> cancel</Button>
        </div>
      </div>
    )
  }
}

export default Togglable