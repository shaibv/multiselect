/* eslint-disable no-console */
import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import register from 'preact-custom-element';
import s from './styles.scss';
import LogoIcon from './LogoIcon';


type MenuItem = {
  id?: string,
  label: string
};
type Section = {
  label?: string,
  items: MenuItem[]
};
interface Props {
  data: string
  activemenuitem: string,
}


const Logo = () => (
  <div className={s.logo}><LogoIcon /></div>
);

const Section: FunctionComponent<{ section: Section, isActive: MenuItem}> = (
  { section, isActive },
) => (
  <div className={s.section}>
    {section.label && <h5>{section.label}</h5>}
    <ul>
      {section.items.map((item, index) => (
        <li
          className={isActive && isActive.label === item.label ? s.active : undefined}
          tabIndex={-index}
          key={item.label}
        >
          {item.label}
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar: FunctionComponent<Props> = ({ data, activemenuitem }) => {
  const [dataState, setData] = useState<Section[]>([]);
  const [active, setActive] = useState<MenuItem | null>(null);


  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      setData(parsedData);

      if (activemenuitem) {
        parsedData.map((section) => {
          const filter = section.items.filter((item) => item.label === activemenuitem);
          if (!filter.length) return;
          // @ts-ignore
          setActive(...filter);
        });
      }
    }
  }, [data, activemenuitem]);

  useEffect(() => {
    console.log(active);
  }, [active]);

  if (!dataState) return null;
  return (
    <div className={s.sidebar}>
      <Logo />
      {dataState.map((section) => (
        <Section
          key={section.label}
          section={section}
          isActive={active}
        />
      ))}
    </div>
  );
};

register(Sidebar, 'x-sidebar', ['data', 'activemenuitem']);

export default Sidebar;
