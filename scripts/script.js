const allPostsContainer = document.getElementById('discussion__box-container');
const allPostsSidebarEntries = document.getElementById('discussion__sidebar-entries');
const discussionLoadingSpinner = document.getElementById('discussion__spinner');
const postSearchInput = document.getElementById('postSearch');
const postSearchBtn = document.getElementById('searchBtn');

// posts Search from banner section
postSearchBtn.addEventListener('click', async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${postSearchInput.value}`);
  const data = await res.json();
  const allPosts = data.posts;

  // if no posts found
  if (allPosts.length === 0) {
    allPostsContainer.innerHTML = '';
    discussionLoadingSpinner.style.display = 'block';

    setTimeout(() => {
      discussionLoadingSpinner.style.display = 'none';
      allPostsContainer.innerHTML = `<p class="text-center text-slate-900 text-opacity-80 text-xl font-medium font-inter">No posts found</p>`;
    }, 2000);
  } else {
    allPostsContainer.innerHTML = '';
    discussionLoadingSpinner.style.display = 'block';

    setTimeout(() => {
      discussionLoadingSpinner.style.display = 'none';
      displayAllPosts(allPosts);
    }, 2000);
  }
});

const loadAllPosts = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const allPosts = await res.json();
  displayAllPosts(allPosts.posts);
};

const displayAllPosts = (allPosts) => {
  allPosts.forEach((post) => {
    allPostsContainer.innerHTML += `
    <div class="flex flex-col md:flex-row gap-4 bg-zinc-100 rounded-3xl p-10 shadow-xl">
      <div id="author_img" class="w-[72px] h-[72px] bg-white rounded-2xl relative">
        <img src=${post.image} class="rounded-2xl" />
        <div class="w-[18.67px] h-[18.67px] ${post.isActive ? 'bg-emerald-500' : 'bg-red-500'}  rounded-[100px] border-2 border-white absolute right-0 top-0"></div>
      </div>

      <div class="md:w-full">
        <div>
          <span class="text-slate-900 text-opacity-80 text-sm font-medium font-inter mr-5"># ${post.category}</span>
          <span class="text-slate-900 text-opacity-80 text-sm font-medium font-inter">Author : ${post.author?.name}</span>
        </div>
        <h2 class="text-slate-900 text-xl font-bold font-mulish mt-3"> ${post.title} </h2>
        <p class="mt-4 max-w-[569px] text-slate-900 text-opacity-60 text-base font-normal font-inter leading-relaxed">
          ${post.description}
        </p>
        <div class="mt-5 pt-6 border-t border-dashed border-slate-900 border-opacity-25 flex justify-between items-center">
          <div class="flex gap-4">
            <span class="flex items-center gap-2"><img src="./Assets/images/icon-message.png" alt="" /> <span>${post.comment_count}</span></span>
            <span class="flex items-center gap-2"><img src="./Assets/images/icon-eye.png" alt="" /> <span>${post.view_count}</span></span>
            <span class="flex items-center gap-2"><img src="./Assets/images/icon-clock.png" alt="" /> <span>${post.posted_time} min</span></span>
          </div>
          <img src="./Assets/images/email.png" class="cursor-pointer" onclick="addInSidebar('${post.title}', '${post.view_count}')" />
        </div>
      </div>
    </div>
    `;
  });
};

let markReadCount = 0;
function addInSidebar(title, viewCount) {
  allPostsSidebarEntries.innerHTML += `
  <div class="p-4 bg-white rounded-2xl flex items-center justify-between mb-4">
    <h3 class="text-slate-900 text-base font-semibold font-mulish max-w-[232px]">${title}</h3>
    <div class="flex items-center"><img src="./Assets/images/icon-eye.png" alt="" /><span>${viewCount}</span></div>
  </div>
  `;

  markReadCount += 1;
  document.getElementById('markRead-count').innerText = markReadCount;
}

// loadAllPosts();

setTimeout(() => {
  loadAllPosts();
  discussionLoadingSpinner.style.display = 'none';
}, 2000);
