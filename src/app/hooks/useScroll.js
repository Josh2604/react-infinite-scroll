import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export default function useScroll({ pageNo, limit, apiPath }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [details, setDetails] = useState({
    "total": 0,
    "pages": 0
  });

  const GetData = useCallback(async () => {
    try {
      let cancel;
      let config = {
        method: 'POST',
        url: apiPath,
        data: {
          page_no: pageNo,
          limit: limit ? limit : 10
        },
        cancelToken: new axios.CancelToken(c => cancel = c)
      }

      const response = await axios(config);

      const data = response.data;

      setData(prevData => {
        return [...new Set(prevData), ...data.items]
      });
      setDetails({
        total: data.total,
        pages: data.pages_no
      });
      setHasMore(data.has_more);

      setLoading(false);
      return () => cancel();
    } catch (error) {
      setError(true);
      setLoading(false);
      if (axios.isCancel(error)) {
        return
      }
    }
  }, [pageNo, apiPath, limit]);

  useEffect(() => {
    GetData();
  }, [GetData]);

  return { loading, error, data, hasMore, details };
};