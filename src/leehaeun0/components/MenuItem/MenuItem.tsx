import { MenuItemType } from 'src/leehaeun0/types/menu';

export default function MenuItem({
  data: { name, description, options, image, isPopular, tags },
}: {
  data: MenuItemType;
}) {
  return (
    <li>
      <img src={image} />
      <div>
        <div>
          {isPopular && <span>인기</span>}
          <span>{name}</span>
        </div>

        <div>{description}</div>

        {options.map(({ name, price }) => (
          <div key={price}>
            {name && <span>{`${name} : `}</span>}
            <span>{price}</span>
          </div>
        ))}

        {tags?.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </li>
  );
}
