import { h } from 'preact';
import Icon from './Icon';

export default function Checkmark(props) {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
      <Icon {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
      </Icon>
    );
}
