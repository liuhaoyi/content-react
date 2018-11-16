import React from 'react';
import { connect } from 'dva';

// @connect(({ chart, loading }) => ({
//     chart,
//     loading: loading.effects['chart/fetch'],
//   }))
class SmallCatalog extends React.Component {
    render(){
        return (
            <div>
                hello SmallCatalog;
            </div>
        )
    }
}
export default SmallCatalog