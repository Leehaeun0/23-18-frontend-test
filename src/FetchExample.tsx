import { useEffect, useState } from 'react';
import { type MenuList } from 'src/server/data';

export const FetchExample = () => {
  const [storeMenu, setStoreMenu] = useState<MenuList[]>([]);

  useEffect(() => {
    void fetch(`${location.href}api/store/1234`)
      .then((response) => response.json())
      .then(({ storeMenu }) => setStoreMenu(storeMenu as MenuList[]));
  }, []);

  return (
    <>
      {storeMenu.map(({ id, title }) => (
        <div key={id}>{title}</div>
      ))}
    </>
  );
};
