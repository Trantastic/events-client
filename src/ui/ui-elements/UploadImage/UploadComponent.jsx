import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

/* User */
import * as imageActions from 'store/actions/upload-actions'
import * as uploadSelectors from 'store/selectors/upload-selectors'
/* Dev */
import { green } from 'logger'

const styles = {}

class UploadImageComponent extends React.Component {
  constructor(props) {
    super(props)
    
    let imageUrl = ''
    const initial = this.props.initial
    const uploaded = this.props.uploadedImageUrl
    // test code
    // if (typeof initial !== 'undefined') {
    //   green('initial !== undefined')
    // } else {
    //   green('initial === undefined')
    // }
    // if (!uploaded === null) {
    //   green('uploaded !== null')
    // } else {
    //   green('uploaded === null')
    // }

    if (typeof initial !== 'undefined') {
      green('initial !== undefined')
      imageUrl = initial
    } else if (!uploaded === null) {
      green('uploaded !== null')
      imageUrl = uploaded
    } else {
      green('neither initial or uploaded have a value')
      imageUrl = ''
    }
    // green('imageUrl', imageUrl)

    this.state = {
      imageUrl: imageUrl,
      imageName: '',
    }

  }

  localOnChange = async (event) => {
    let formData = new FormData()
    formData.append('upload', this.fileInput.files[0])
    await this.props.requestUploadOneImage(formData)
    // Calling redux-form's .onChange()
    this.setState({
      imageUrl: this.props.uploadedImageUrl
    })
    this.props.onChange(this.state.imageUrl)
  }

  render() {
    const { classes } = this.props
    // green('Uploadcomponent: props', this.props)
    // green('Uploadcomponent: state', this.state)
    return (
      <Paper className={classes.root} elevation={1}>
        <img src={this.state.imageUrl} alt='uploaded' />
        <Typography>
          Upload an image
        </Typography>
        <input
          type="file"
          ref={input => {
            this.fileInput = input
          }}
          name='upload'
          onChange={this.localOnChange}
        />
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    requestUploadOneImage: imageActions.requestKeyUploadOneImage,
    uploadedImageUrl: uploadSelectors.getUploadedImageUrl(state),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, imageActions)
)(UploadImageComponent)
