import React, { Component } from 'react'
import { skills } from '../support/skills'
import GitHub from './github'

const colors = {
  1: { f: '#9fd3c7', b: '#eeeeee' },
  2: { f: '#385170', b: '#eeeeee' },
  3: { f: '#444444', b: '#353535' }
}

class MySkills extends Component {
  constructor () {
    super()
    this.state = {
      selected: false,
      coords: { x: 0, y: 0 },
      started: false,
      top: null,
      organized: false
    }
  }
  handleClick = () => {
    const organized = !this.state.organized
    this.setState({ organized, selected: false, top: null })
  }
  componentDidMount () {
    const bigBubbleSize = 150
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    let balls = []

    const mouseDown = evt => {
      const rect = canvas.getBoundingClientRect()

      if (this.state.organized) {
        for (let i = 0; i < balls.length; i++) {
          const ball = balls[i]
          const mX =
            ((evt.clientX - rect.left) / (rect.right - rect.left)) *
            canvas.width
          const mY =
            ((evt.clientY - rect.top) / (rect.bottom - rect.top)) *
            canvas.height
          if (
            mX >= ball.x &&
            mX <= ball.x + ball.width &&
            (mY >= ball.y && mY <= ball.y + ball.height)
          ) {
            if (this.state.selected !== ball.label) {
              this.setState({
                selected: ball.label,
                coords: {
                  x: mX,
                  y: mY
                }
              })
            } else {
              this.setState({ selected: false, coords: { x: 0, y: 0 } })
            }
          }
        }
      } else {
        const mX =
          ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
        const mY =
          ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
        for (let i = 0; i < balls.length; i++) {
          const ball = balls[i]
          if (
            mX >= ball.x - ball.size &&
            mX <= ball.x + ball.size &&
            (mY >= ball.y - ball.size && mY <= ball.y + ball.size)
          ) {
            if (this.state.selected !== ball.label) {
              this.setState({
                selected: balls[i].label,
                coords: {
                  x: mX,
                  y: mY
                },
                top: ball
              })
            } else {
              this.setState({ selected: false, coords: { x: 0, y: 0 } })
            }
          }
        }
      }
    }
    canvas.addEventListener('mousedown', mouseDown)

    const random = (min, max) => {
      let num = Math.random() * (max - min) + min
      return num
    }

    class Ball {
      constructor (x, y, skill) {
        this.x = x
        this.y = y
        this.velX = random(-1, 1)
        this.velY = random(-1, 1)
        this.color = colors[skill.pri].f
        this.dropshadow = colors[skill.pri].b
        this.permSize = Math.round(skill.name.length * 8)
        this.size = 0
        this.label = skill.name
        this.prof = skill.prof
        this.type = skill.type
        this.height = 0
        this.width = 0
        this.permFont = 20
        this.font = 0
      }
      draw = selected => {
        // ctx.beginPath()
        // ctx.fillStyle = this.dropshadow
        // ctx.arc(this.x + 3, this.y + 3, this.size, 0, 2 * Math.PI)
        // ctx.fill()
        // ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        const drawTextBox = () => {
          const start_degrees = 330
          const start_angle = (Math.PI / 180) * start_degrees

          const end_degrees = 210
          const end_angle = (Math.PI / 180) * end_degrees

          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size - 10, start_angle, end_angle, false)
          ctx.closePath()
          ctx.lineWidth = 5
          ctx.fillStyle = '#eeeeee'
          ctx.fill()
        }

        if (selected === this.label) {
          if (this.size < bigBubbleSize) {
            this.size += 1

            drawTextBox()
          }
          drawTextBox()

          this.velX = 0
          this.velY = 0
          ctx.fillStyle = '#eeeeee'
          ctx.font = '40px Roboto Condensed'
          ctx.fillText(
            this.label,
            this.x - this.label.length * 10,
            this.y - this.size / 2
          )

          ctx.fillStyle = '#444444'
          ctx.font = '20px Roboto Condensed'
          ctx.fillText('-' + this.prof, this.x - this.size + 40, this.y)
          ctx.fillText('-' + this.type, this.x - this.size + 40, this.y + 40)
        } else {
          ctx.fillStyle = '#f5f5f5'
          ctx.font = this.font + 'px Roboto Condensed'
          ctx.fillText(this.label, this.x - this.size / 1.5, this.y + 10)
          if (this.velX === 0) {
            this.velX = random(-1, 1)
            this.velY = random(-1, 1)
          }
          if (this.size > this.permSize) {
            this.size -= 1
          }
        }
      }

      drawOrg = selected => {
        if (this.label !== selected) {
          this.height = this.permFont * 2
          this.width = this.permSize * 2.5
          this.size = this.permSize
          ctx.beginPath()
          ctx.fillStyle = this.dropshadow
          ctx.rect(this.x + 5, this.y + 5, this.width, this.height)
          ctx.fill()
          ctx.closePath()

          ctx.beginPath()
          ctx.fillStyle = this.color
          ctx.rect(this.x, this.y, this.width, this.height)
          ctx.fill()
          ctx.closePath()

          ctx.fillStyle = '#f5f5f5'
          ctx.font = this.permFont + 'px Roboto Condensed'
          ctx.fillText(this.label, this.x + 20, this.y + this.permFont + 15)

          return { x: this.width + 15, y: 0 }
        } else {
          this.size = this.permSize
          this.height = this.permFont * 6
          if (this.prof.length > this.type.length) {
            this.width = (this.prof.length / 2) * this.permFont + 20
          } else {
            this.width = (this.type.length / 2) * this.permFont + 20
          }

          ctx.beginPath()
          ctx.fillStyle = this.dropshadow
          ctx.rect(this.x + 5, this.y + 5, this.width, this.height)
          ctx.fill()
          ctx.closePath()

          ctx.beginPath()
          ctx.fillStyle = this.color
          ctx.rect(this.x, this.y, this.width, this.height)
          ctx.fill()
          ctx.closePath()

          ctx.beginPath()
          ctx.fillStyle = '#f5f5f5'
          ctx.rect(
            this.x + 10,
            this.y + this.permFont + 35,
            this.width - 20,
            this.height - this.permFont - 45
          )
          ctx.fill()
          ctx.closePath()

          ctx.fillStyle = '#f5f5f5'
          ctx.font = this.permFont + 'px Roboto Condensed'
          ctx.fillText(this.label, this.x + 20, this.y + this.permFont + 15)

          ctx.fillStyle = '#444444'
          ctx.font = this.permFont - 5 + 'px Roboto Condensed'
          ctx.fillText(
            '-' + this.prof,
            this.x + 20,
            this.y + this.permFont + this.height / 2
          )

          ctx.fillStyle = '#444444'
          ctx.font = this.permFont - 5 + 'px Roboto Condensed'
          ctx.fillText(
            '-' + this.type,
            this.x + 20,
            this.y + this.permFont + this.height / 1.5
          )

          return { x: this.width + 15, y: this.height }
        }
      }

      update = state => {
        const selected = state.selected

        if (this.x + this.size >= width) {
          this.velX = -this.velX
          this.x -= 3
        }
        if (this.x - this.size <= 0) {
          this.velX = -this.velX
          this.x += 3
        }
        if (this.y + this.size >= height) {
          this.velY = -this.velY
          this.y -= 3
        }
        if (this.y - this.size <= 0) {
          this.velY = -this.velY
          this.y += 3
        }
        this.x += this.velX
        this.y += this.velY

        if (this.label !== selected && !this.organized) {
          for (let j = 0; j < balls.length; j++) {
            let a = this.size + balls[j].size
            let x = this.x - balls[j].x
            let y = this.y - balls[j].y

            if (balls[j].label === selected) {
              if (a > Math.sqrt(x * x + y * y)) {
                if (this.size > 10) this.size--
                if (this.font > 1) this.font -= 0.5
              } else {
                if (this.size < this.permSize) this.size++

                if (this.font < this.permFont) this.font += 0.5
              }
            }
            if (selected === false) {
              if (this.size < this.permSize) this.size++

              if (this.font < this.permFont) this.font += 0.5
            }
          }
        }
      }
    }

    const loop = () => {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)
      // ctx.beginPath()
      // ctx.rect(0, 0, canvas.width, canvas.height)
      // ctx.closePath()

      const setup = () => {
        let row = 1
        let column = 1
        let lab = 0

        for (let i = 0; i < skills.length; i++) {
          if (row > 5) {
            row = 1
            column++
          }
          let ball = new Ball(row * 200, column * 200, skills[lab])

          balls.push(ball)

          lab++
          row++
        }
        this.setState({ started: true })
      }

      const organize = () => {
        let row = 20
        let column = 20
        let add = 0

        for (let i = 0; i < balls.length; i++) {
          const ball = balls[i]
          if (row >= canvas.width - balls[i].width) {
            row = 20
            column += add || 45
            column += 15
            add = 0
          }

          ball.x = row
          ball.y = column
          let result = ball.drawOrg(this.state.selected)

          row += result.x
          add += result.y
        }
      }

      if (!this.state.started && !this.state.organized) {
        setup()
      }

      if (this.state.top) {
        this.state.top.draw(this.state.selected)
      }

      for (let i = 0; i < balls.length; i++) {
        if (!this.state.organized) {
          balls[i].draw(this.state.selected)
          balls[i].update(this.state)
          if (this.state.top) {
            this.state.top.draw(this.state.selected)
          }
        } else {
          organize()
        }
      }

      requestAnimationFrame(loop)
    }

    loop()
  }

  render () {
    const organized = this.state.organized
    return (
      <div id='skill'>
        <h1>
          <p>What I Bring to the Table</p>
        </h1>
        <div>
          <canvas
            ref='canvas'
            id='canvas'
            width={screen.width}
            height={600}
            onKeyPress={this.keyPress}
            tabIndex='0'
          />
          {organized ? <div /> : <img id='legend' src='/legend.png' />}
        </div>
        <div>
          <div>
            <h1>
              <a onClick={this.handleClick}>Organize</a>
            </h1>
            <span />
          </div>
        </div>
      </div>
    )
  }
}
export default MySkills
