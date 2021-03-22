import React, {Component} from 'react';
import FullScreenApp from './FullScreenApp';
import {withRouter} from 'react-router';

class PageManagerController extends Component{

    render(){
        return(
            <div>
              <FullScreenApp></FullScreenApp>
            </div>
        );
    }

}

export default withRouter(PageManagerController);