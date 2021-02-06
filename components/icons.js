import { createIcon } from '@chakra-ui/icons';

export const Logo = createIcon({
  displayName: 'logo',
  viewBox: '0 0 30 30',
  path: (
    <path
      d='M22.9,12.1C20.6,11.6,21.9,4,15,4c-7.1,0-5.5,7.2-8,8.1C4.6,13,3,15.2,3,18c5.9,0,2.6,4.7,4.7,5.3c2.1,0.7,3,0.9,3.7,2.5	C12,27,12.8,28,15.1,28c3.7,0,3.1-3.1,5-3.6C24.8,23,20.4,19,27,19C27,16.2,27,13,22.9,12.1z M12,12.6c-0.6,0-1-0.7-1-1.5	s0.4-1.5,1-1.5s1,0.7,1,1.5S12.6,12.6,12,12.6z M16,12.6c-0.6,0-1-0.7-1-1.5s0.4-1.5,1-1.5s1,0.7,1,1.5S16.6,12.6,16,12.6z'
      fill='currentColor'
      transform='scale(-1,1) translate(-30, 0)' //flip horizontally
    ></path>
  ),
});
