import { createIcon } from '@chakra-ui/icons';
// using `path`
export const Github = createIcon({
  displayName: 'github',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
    </g>
  ),
});

export const Google = createIcon({
  displayName: 'google',
  viewBox: '0 0 533.5 544.3',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g>
      <path
        d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
        fill='#4285f4'
      />
      <path
        d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
        fill='#34a853'
      />
      <path
        d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
        fill='#fbbc04'
      />
      <path
        d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
        fill='#ea4335'
      />
    </g>
  ),
});

export const Logo = createIcon({
  displayName: 'logo',
  viewBox: '0 0 30 30',
  path: (
    <path
      d='M22.9,12.1C20.6,11.6,21.9,4,15,4c-7.1,0-5.5,7.2-8,8.1C4.6,13,3,15.2,3,18c5.9,0,2.6,4.7,4.7,5.3c2.1,0.7,3,0.9,3.7,2.5	C12,27,12.8,28,15.1,28c3.7,0,3.1-3.1,5-3.6C24.8,23,20.4,19,27,19C27,16.2,27,13,22.9,12.1z M12,12.6c-0.6,0-1-0.7-1-1.5	s0.4-1.5,1-1.5s1,0.7,1,1.5S12.6,12.6,12,12.6z M16,12.6c-0.6,0-1-0.7-1-1.5s0.4-1.5,1-1.5s1,0.7,1,1.5S16.6,12.6,16,12.6z'
      fill='#000000'
      transform='scale(-1,1) translate(-30, 0)' //flip horizontally
    ></path>
  ),
});

export const Twitter = createIcon({
  displayName: 'twitter',
  viewBox: '328 355 335 276',
  path: (
    <path
      d='
      M 630, 425
      A 195, 195 0 0 1 331, 600
      A 142, 142 0 0 0 428, 570
      A  70,  70 0 0 1 370, 523
      A  70,  70 0 0 0 401, 521
      A  70,  70 0 0 1 344, 455
      A  70,  70 0 0 0 372, 460
      A  70,  70 0 0 1 354, 370
      A 195, 195 0 0 0 495, 442
      A  67,  67 0 0 1 611, 380
      A 117, 117 0 0 0 654, 363
      A  65,  65 0 0 1 623, 401
      A 117, 117 0 0 0 662, 390
      A  65,  65 0 0 1 630, 425
      Z'
      fill='#3BA9EE'
    />
  ),
});
