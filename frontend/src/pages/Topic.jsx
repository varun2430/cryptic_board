import Post from "../components/Post";

const Topic = () => {
  return (
    <div className=" flex flex-col items-center justify-center lg:mx-24 mx-2">
      <div className=" flex items-center justify-center h-32 md:w-5/6 w-full bg-gray-600 mt-2 mb-1">
        <p className=" text-5xl md:text-6xl font-bold text-white">/topic</p>
      </div>
      <div className=" md:w-5/6 w-full bg-gray-600 my-1">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex items-center justify-start bg-red-500">
            <p className=" text-xl font-bold px-2 py-1">New Post</p>
          </div>
          <div className=" w-full">
            <form className=" px-4 pt-2 pb-2">
              <div className="mb-3">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="border rounded w-full py-1 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter subject"
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-1 px-3 bg-grey-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                  placeholder="Enter description"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-1"
                  htmlFor="file"
                >
                  File (Image or GIF)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" md:w-5/6 w-full bg-gray-600 my-1">
        <div className=" flex flex-col justify-center w-full">
          <div className="flex items-center justify-start bg-red-500">
            <p className=" text-xl font-bold px-2 py-1">Posts</p>
          </div>
          <div className="flex flex-col">
            <Post
              image="fhd.jpg"
              subject="subject text example text example text subject text example text example text."
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat eros ullamcorper, molestie orci a, aliquet nulla. Quisque cursus, lacus sagittis viverra tincidunt, massa neque hendrerit magna, eu gravida mi erat posuere massa. Integer sed ultricies arcu. Nullam luctus metus sit amet erat laoreet dignissim."
            />
            <Post
              image="hd.jpg"
              subject="subject text example text example text."
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat eros ullamcorper, molestie orci a, aliquet nulla. Quisque cursus, lacus sagittis viverra tincidunt, massa neque hendrerit magna, eu gravida mi erat posuere massa. Integer sed ultricies arcu. Nullam luctus metus sit amet erat laoreet dignissim. Aliquam gravida placerat sapien, eu scelerisque dui semper vitae. Etiam et commodo sem, nec egestas mi. Cras porta pellentesque ante sit amet consectetur. Proin quis lacinia nulla. Sed tortor nunc, condimentum ut erat et, malesuada accumsan odio. Praesent in lobortis ante. Donec non congue eros, vitae auctor velit."
            />
            <Post
              image="hd.jpg"
              subject="subject text example text example text."
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat eros ullamcorper, molestie orci a, aliquet nulla. Quisque cursus, lacus sagittis viverra tincidunt, massa neque hendrerit magna, eu gravida mi erat posuere massa. Integer sed ultricies arcu. Nullam luctus metus sit amet erat laoreet dignissim. Aliquam gravida placerat sapien, eu scelerisque dui semper vitae. Etiam et commodo sem, nec egestas mi. Cras porta pellentesque ante sit amet consectetur. Proin quis lacinia nulla. Sed tortor nunc, condimentum ut erat et, malesuada accumsan odio. Praesent in lobortis ante. Donec non congue eros, vitae auctor velit.

                Fusce rhoncus mauris nec justo elementum fringilla. Etiam id dui accumsan, fermentum odio at, molestie lacus. Etiam et augue dignissim, iaculis lectus non, porta lectus. Maecenas tempus sit amet mi nec semper. Nam a condimentum enim. Integer auctor ut nibh vel finibus. Aliquam vel odio orci."
            />
            <Post
              image="fhd.jpg"
              subject="subject text example text example text."
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat eros ullamcorper, molestie orci a, aliquet nulla. Quisque cursus, lacus sagittis viverra tincidunt, massa neque hendrerit magna, eu gravida mi erat posuere massa. Integer sed ultricies arcu. Nullam luctus metus sit amet erat laoreet dignissim. Aliquam gravida placerat sapien, eu scelerisque dui semper vitae. Etiam et commodo sem, nec egestas mi. Cras porta pellentesque ante sit amet consectetur. Proin quis lacinia nulla. Sed tortor nunc, condimentum ut erat et, malesuada accumsan odio. Praesent in lobortis ante. Donec non congue eros, vitae auctor velit.
                Fusce rhoncus mauris nec justo elementum fringilla. Etiam id dui accumsan, fermentum odio at, molestie lacus. Etiam et augue dignissim, iaculis lectus non, porta lectus. Maecenas tempus sit amet mi nec semper. Nam a condimentum enim. Integer auctor ut nibh vel finibus. Aliquam vel odio orci.
                In hac habitasse platea dictumst. Sed finibus placerat felis, non egestas magna gravida quis. Mauris finibus arcu ac pulvinar accumsan. Aliquam erat volutpat. Mauris rutrum metus ut nisi blandit volutpat. Nulla vitae interdum felis. Proin suscipit nisl at est hendrerit, quis consectetur magna lobortis.
                Maecenas pellentesque accumsan sapien, sit amet ullamcorper magna faucibus ut. Ut lacinia diam quis arcu dapibus consequat. Donec laoreet mattis lacus et volutpat. Sed porta purus quis ex sagittis iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed venenatis turpis ut ante accumsan, quis tincidunt magna congue. Pellentesque bibendum, est id feugiat condimentum, ante ligula tempor nulla, eget porttitor lectus diam eu velit. Cras vel leo id odio congue ullamcorper. Phasellus laoreet iaculis risus ut commodo. Praesent suscipit nunc non dolor congue, nec convallis felis lobortis. Donec sem lorem, malesuada id ullamcorper at, malesuada eget tellus. Curabitur eget consequat nisl. Quisque ut felis ac augue condimentum luctus. Cras congue lectus eget arcu rhoncus eleifend. Integer ultricies elit non orci sagittis, sagittis facilisis sem tempus.                
                Sed fringilla scelerisque tellus, sit amet blandit turpis fringilla ac. Pellentesque scelerisque ac arcu molestie consequat. Aenean lacinia volutpat massa feugiat convallis. Sed facilisis rutrum cursus. Pellentesque consequat quam quis risus egestas viverra. In in fringilla felis, vitae dapibus tellus. Phasellus arcu neque, ornare semper libero vitae, elementum varius ex. Nulla malesuada lectus ut quam mattis, nec scelerisque leo laoreet. Nunc mattis varius dolor sit amet malesuada."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
