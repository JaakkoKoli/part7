import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Form } from 'semantic-ui-react'

const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input
            value={title}
            name='title'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>author</label>
          <input
            value={author}
            name='author'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>url</label>
          <input
            value={url}
            name='url'
            onChange={handleChange}
          />
        </div>
        <br />
        <Button type="submit" color="black"><Icon name="add" />Luo</Button>
        <br /><br />
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm