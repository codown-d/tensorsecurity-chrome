import { AppConfigContext } from '@/contexts/AppConfigContext';
import { getProductList } from '@/services';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type UseAppAccessReturn = { app: boolean; page: boolean };
export function useAppAccess(): UseAppAccessReturn {
  const { sysConfig, webInfo } = useContext(AppConfigContext);
  const [productList, setProductList] = useState([]);

  let access = useMemo(() => {
    let urlList = sysConfig?.product.map(
      (item) => `${item.protocol}://${item.pageUrl}`,
    );
    return {
      app: productList.some((item) => {
        return webInfo?.url.indexOf(item) != -1;
      }),
      page: urlList?.some((item) => {
        return item.indexOf(webInfo?.url) != -1;
      }),
    };
  }, [sysConfig, webInfo, productList]);

  let fetchPermissions = useCallback(async () => {
    const response = await getProductList();
    setProductList(response.data);
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, []);
  useEffect(() => {}, [sysConfig, webInfo, productList]);

  return access;
}

export function useOverflowTooltip(content: React.ReactNode) {
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const { scrollWidth, clientWidth } = contentRef.current;
        setIsOverflow(scrollWidth > clientWidth);
      }
    };

    // Initial check
    checkOverflow();

    // ResizeObserver to handle content changes
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [content]);

  return { contentRef, isOverflow };
}
