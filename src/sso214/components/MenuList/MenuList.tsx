import { useCallback } from 'react';
import { MenuList, MenuItem } from '../../types/Model';
import { CustomList } from '../List';
import { CustomHeading } from '../Heading';
import { CustomMenu } from '../Menu';
import S from './style.module.css';

type Props = MenuList;

const MenuList = ({ title, menus }: Props) => {
  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => <CustomMenu data-testid="item" menu={item} />,
    [],
  );
  const keyExtractor = useCallback((item: MenuItem) => item.name, []);

  return (
    <>
      <CustomHeading headingLevel="h2" className={S.title} data-testid="title">
        {title}
      </CustomHeading>

      <CustomList<MenuItem>
        containerTag="ul"
        data={menus}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data-testid="list"
      />
    </>
  );
};

export default MenuList;
