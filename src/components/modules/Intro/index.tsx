import Link from 'next/link';
import Image from 'next/image';
import Header from 'components/ui/theme/Header';

const Intro = () => (
  <div className="bg-[url('/assets/illustrations/overlay.svg')] bg-contain bg-right-top bg-no-repeat pb-16">
    <Header />
    <div className="container py-16 flex items-center flex-col md:flex-row justify-between">
      <div className="flex-1 w-full md:w-1/2 mb-8 md:mb-0">
        <h1 className="mb-8 text-3xl md:text-5xl font-bold text-brand-primary dark:text-white typography">
          Hello{' '}
          <span role="img" aria-label="Waving hand">
            (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
          </span>
        </h1>
        <h2 className="mb-[2.5rem] text-2xl md:text-4xl text-brand-secondary dark:text-slate-200 typography">
          I am Shrishty, a gal who just wants to code and create amazing things.
        </h2>
        <Link href="#contact" className="button button-primary">
          Hire me
        </Link>
      </div>
      <div className="flex-1 w-full md:w-1/2 ml-10 ">
        <Image
          src="/assets/illustrations/13.svg"
          alt="I'm Shrishty and I'm a creativity "
          width={500}
          height={500}
          priority
          //className="dark:invert"
        />
      </div>
    </div>
  </div>
);

export default Intro;
