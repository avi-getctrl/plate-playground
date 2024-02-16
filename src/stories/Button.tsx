import styled from '@emotion/styled'
import { type ComponentProps } from 'react'
import ReactLogo from '../assets/react.svg?react'
import { observer } from 'mobx-react-lite'

interface ButtonVariants {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
}

const StyledButton = styled.button<ButtonVariants>`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  color: ${(props) => (props.primary ? 'white' : '#333')};
  background-color: ${(props) => (props.primary ? '#1ea7fd' : 'transparent')};
  box-shadow: ${(props) => (props.primary ? 'rgba(0, 0, 0, 0.15) 0 0 0 1px inset' : 'none')};

  font-size: ${({ size }) => (size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px')};
  padding: ${({ size }) => (size === 'small' ? '10px 16px' : size === 'medium' ? '11px 20px' : '12px 24px')};
`

const ButtonContent = styled.span`
  color: green;
`

interface ButtonProps extends ComponentProps<typeof StyledButton> {
  /**
   * What background color to use
   */
  backgroundColor?: string
}

/**
 * Primary UI component for user interaction
 */
export const Button = styled(
  observer(function Button({
    primary = false,
    size = 'medium',
    backgroundColor,
    type = 'button',
    children,
    style = {},
    ...props
  }: ButtonProps) {
    return (
      <StyledButton {...{ type, size, primary, style: { backgroundColor, ...style }, ...props }}>
        {size}
        <ReactLogo />
        <ButtonContent {...{ children }} />
      </StyledButton>
    )
  }),
)`
  color: red;
  display: flex;
  gap: 1ch;
  align-items: center;
  justify-content: center;

  ${ButtonContent} {
    color: purple;
  }
`
