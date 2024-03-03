const allPostsContainer = document.getElementById('discussion__box-container');

const loadAllPosts = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const allPosts = await res.json();
  displayAllPosts(allPosts.posts);
};

const displayAllPosts = (allPosts) => {
  allPosts.forEach((post) => {
    allPostsContainer.innerHTML += `
    <div class="flex gap-4 bg-zinc-100 rounded-3xl p-10">
      <div id="author_img" class="w-[72px] h-[72px] bg-white rounded-2xl relative">
        <img src=${post.image} class="rounded-2xl" />
        <div class="w-[18.67px] h-[18.67px] ${post.isActive ? 'bg-emerald-500' : 'bg-red-500'}  rounded-[100px] border-2 border-white absolute right-0 top-0"></div>
      </div>

      <div>
        <div>
          <span class="text-slate-900 text-opacity-80 text-sm font-medium font-inter mr-5"># ${post.category}</span>
          <span class="text-slate-900 text-opacity-80 text-sm font-medium font-inter">Author : ${post.author?.name}</span>
        </div>
        <h2 class="text-slate-900 text-xl font-bold font-mulish mt-3"> ${post.title} </h2>
        <p class="mt-4 w-[569px] text-slate-900 text-opacity-60 text-base font-normal font-inter leading-relaxed">
          ${post.description}
        </p>
        <div class="mt-5 pt-6 border-t border-dashed border-slate-900 border-opacity-25 flex justify-between items-center">
          <div class="flex gap-4">
            <span class="flex items-center gap-2"><img src="./Assets/images/icon-message.png" alt="" /> <span>${post.comment_count}</span></span>
            <span class="flex items-center gap-2"><img src="./Assets/images/icon-eye.png" alt="" /> <span>${post.view_count}</span></span>
            <span class="flex items-center gap-2"><img src="./Assets/images/icon-clock.png" alt="" /> <span>${post.posted_time} min</span></span>
          </div>
          <img src="./Assets/images/email.png" alt="" />
        </div>
      </div>
    </div>
    `;
  });
};

loadAllPosts();
