import { GoBackButton } from "./GoBackButton";

export function Unauthorized() {
  return (
    <section className='flex-1 flex flex-col gap-10 justify-center items-center pb-20'>
      <h1 className='text-3xl px-4 lg:px-0 lg:text-4xl font-semibold text-balance text-center'>
        User is not authorized to see this page
      </h1>
      {/* Go back */}
      <GoBackButton />
    </section>
  );
}
