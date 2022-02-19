import {
  Fade,
  Bounce,
  Zoom,
  Slide,
  Flip,
  AttentionSeeker,
  Hinge,
  JackInTheBox,
  Roll,
  Rotate,
} from 'react-awesome-reveal';

export default function test() {
  return (
    <>
      <Fade>
        <h1>FADE</h1>
      </Fade>

      <Bounce>
        <h1>BOUNCE</h1>
      </Bounce>

      <Zoom>
        <h1>ZOOM</h1>
      </Zoom>

      <Slide>
        <h1>SLIDE</h1>
      </Slide>

      <Flip>
        <h1>FLIP</h1>
      </Flip>
      <AttentionSeeker>
        <h1>AttentionSeeker</h1>
      </AttentionSeeker>
      <Hinge>
        <h1>Hinge</h1>
      </Hinge>
      <JackInTheBox>
        <h1>JackInTheBox</h1>
      </JackInTheBox>
      <Roll>
        <h1>Roll</h1>
      </Roll>
      <Rotate>
        <h1>Rotate</h1>
      </Rotate>
    </>
  );
}
