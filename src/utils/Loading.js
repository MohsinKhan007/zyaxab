import {Spin} from 'antd';
import '../css/layout.css';
const Loading=()=>
{
return (<Spin className='loginform-loader-custom'  size='large' tip='loading...'></Spin>)
}
export default Loading
