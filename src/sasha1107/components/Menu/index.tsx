import { useNavigate } from 'react-router-dom';
import { useQueryString } from '../../hooks';
import { useParams } from 'react-router-dom';
import type { MenuInterface } from '../../types';

const Menu = ({ data }: { data: MenuInterface }) => {
  const { name, image, description, isPopular, tags, options, id } = data;
  const { queryString } = useQueryString();
  const { storeId } = useParams();
  const navigate = useNavigate();
  return (
    <li
      className="card"
      onClick={() => {
        navigate(`/store/${storeId}/menu/${id}${queryString}`);
      }}
    >
      <div className="content">
        <div className="title">
          {name}
          {isPopular && (
            <span className="badge" data-testid="popularBadge">
              인기
            </span>
          )}
        </div>
        <div className="description">{description}</div>
        <div className="price">
          {options.map(({ name, price }, index) => (
            <div key={index}>
              {name && <span className="name">{name}</span>}
              <span className="price">{price.toLocaleString()}원</span>
            </div>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="tags">
            {tags.map((item, index) => (
              <span key={index} className="tag">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
      {image && (
        <div className="image">
          <img src={image} alt={`${name} 이미지`} />
        </div>
      )}
    </li>
  );
};

export default Menu;
