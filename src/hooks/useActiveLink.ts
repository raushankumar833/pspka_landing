import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  // the deep arg is not used for now but dont delete

  const { pathname, asPath } = useRouter();

  const checkPath = path.startsWith('#');

  const currentPath = path === '/' ? '/' : `${path}/`;

  const normalActive =
    (!checkPath && pathname === currentPath) || (!checkPath && asPath === currentPath);

  // const deepActive =
  //   (!checkPath && pathname.includes(currentPath)) || (!checkPath && asPath.includes(currentPath));

  return {
    // active: deep ? deepActive : normalActive,
    active:  normalActive,
    isExternalLink: path.includes('http'),
  };
}
