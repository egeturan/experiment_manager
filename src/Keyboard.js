import KeyboardEventHandler from 'react-keyboard-event-handler';

const Keyboard = (props) => (<div>
  <div>key detected: {props.eventKey}</div>
  <KeyboardEventHandler
    handleKeys={['a', 'b', 'c']}
    onKeyEvent={(key, e) => console.log(`do something upon keydown event of ${key}`)} />
</div>);
