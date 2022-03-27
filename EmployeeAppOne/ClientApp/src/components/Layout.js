import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export {Layout}

function Layout(props) {

  return (
    <div>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}

// export class Layout extends Component {
//   static displayName = Layout.name;

//   render () {
//     return (
//       <div>
//         <NavMenu />
//         <Container>
//           {this.props.children}
//         </Container>
//       </div>
//     );
//   }
// }
