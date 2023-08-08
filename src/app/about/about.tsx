import React from "react";
import Link from "next/link";

function about() {
  return (
    <div className="bg-white">
      <div className="relative min-h-screen isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-orange-600 sm:text-6xl">
              About Idea Wall
            </h1>
            <p className="mt-6 text-xl font-semibold leading-8 text-gray-600">
              Welcome to Idea Wall, a passion-driven project crafted by
              Kingston, a solo developer with a mission to simplify your
              note-taking and collaboration experience.
            </p>
            <h2 className="mt-6 text-2xl font-bold leading-8 text-gray-600">
              Our Mission
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Idea Wall, our mission is to empower individuals and teams to
              capture and nurture their ideas in a dynamic and collaborative
              environment. We believe that great ideas can come from anyone,
              anywhere, and at any time. With Idea Wall, Kingston aims to
              provide a seamless platform for users to bring their ideas to
              life, share them with others, and foster meaningful
              collaborations.
            </p>
            <h2 className="mt-6 text-2xl font-bold leading-8 text-gray-600">
              Our Story
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Idea Wall began as a solo endeavor by Kingston, who is passionate
              about creating tools that enhance productivity and creativity.
              Driven by the desire to provide a practical and efficient solution
              for note-taking and collaboration, Kingston embarked on this
              project with dedication and enthusiasm.
            </p>
            <h2 className="mt-6 text-2xl font-bold leading-8 text-gray-600">
              Contact Kingston
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Got questions or feedback? Kingston would love to hear from you!
              Reach out at <Link href="mailto:kyawkingston@gmail.com" className="text-orange-600 hover:text-orange-500">kyawkingston@gmail.com</Link> to connect directly.
            </p>
            <h2 className="mt-6 text-2xl font-bold leading-8 text-gray-600">
              Thank You
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Thank you for choosing Idea Wall. Kingston is honored to be a part
              of your creative journey and looks forward to making note-taking
              and collaboration an enjoyable experience for you.
            </p>
            <p className="mt-6 text-xl font-semibold leading-8 text-gray-600">
              Happy note-taking and ideating!
            </p>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default about;
