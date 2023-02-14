import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddComment = props => {
  // state = {
  //   comment: {
  //     comment: '',
  //     rate: 1,
  //     elementId: this.props.asin,
  //   },
  // }

  const [addingComment, setComment] = useState(
    {
      comment: '',
      rate: 1,
      elementId: props.asin
    }
  )

  useEffect(() => {
    setComment({
      ...addingComment,
      elementId: props.asin
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]) 

  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       comment: {
  //         ...this.state.comment,
  //         elementId: this.props.asin,
  //       },
  //     })
  //   }
  // }

  const sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(addingComment),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ViOGI0NGIyODU2YjAwMTMyYTcxZTEiLCJpYXQiOjE2NzYzODA5OTYsImV4cCI6MTY3NzU5MDU5Nn0.CbLJh1xz8O-iesriebaaiSZGxJZDFD7oOPtkxPLiOJk',
          },
        }
      )
      if (response.ok) {
        alert('Comment was sent!')
        setComment({
          comment: '',
          rate: 1,
          elementId: props.asin
        })
        // this.setState({
        //   comment: {
        //     comment: '',
        //     rate: 1,
        //     elementId: this.props.asin,
        //   },
        // })
      } else {
        console.log('error')
        alert('something went wrong')
      }
    } catch (error) {
      console.log('error')
    }
  }


    return (
      <div className="my-3">
        <Form onSubmit={sendComment}>
          <Form.Group>
            <Form.Label>Comment text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add comment here"
              value={addingComment.comment}
              onChange={(e) =>
                setComment({
                  
                    ...addingComment,
                    comment: e.target.value,
                  
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={addingComment.rate}
              onChange={(e) =>
                
                  setComment({
                    ...addingComment,
                    rate: e.target.value,
                  
                })
              }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }


export default AddComment
