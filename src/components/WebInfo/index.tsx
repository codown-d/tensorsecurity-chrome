import { AppConfigContext } from '@/contexts/AppConfigContext';
import { Typography } from 'antd';
import React, { useContext, useMemo } from 'react';
import TruncatedTextWithTooltip from '../TruncatedTextWithTooltip';
import './index.less';
const { Text } = Typography;
interface Props {}
const WebInfo: React.FC<Props> = (props) => {
  const { webInfo } = useContext(AppConfigContext);
  let { host, hash, title } = useMemo(() => {
    return {
      title: webInfo?.title,
      url: webInfo?.url,
      hash: webInfo?.hash,
      host: webInfo?.host,
    };
  }, [webInfo]);
  return (
    <div
      className="flex-r-c web-info"
      style={{ width: '100%', height: '86px' }}
    >
      <div
        style={{ width: '108px', height: '100%' }}
        className="flex-c-c web-ico"
      >
        <img src="/images/web-ico.svg" alt="" />
        <span className="web-title">产品名称</span>
      </div>
      <div style={{ flex: 1, width: '0px' }} className="ml16">
        <div className="web-name">
          <TruncatedTextWithTooltip content={title} />
        </div>
        <div className="web-url mt2 flex-r-c" style={{justifyContent:'flex-start'}}>
          URL：
          <span style={{ display: 'inline-block', width: 'calc(100% - 42px)' }}>
            <TruncatedTextWithTooltip content={host} />
          </span>
        </div>
        <div className="web-url web-path mt2 flex-r-c"  style={{justifyContent:'flex-start'}}>
          路径：
          <span style={{ display: 'inline-block', width: 'calc(100% - 42px)' }}>
            <TruncatedTextWithTooltip content={hash} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default WebInfo;
