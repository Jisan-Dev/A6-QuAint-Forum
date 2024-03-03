const allPostsContainer = document.getElementById('discussion__box-container');
const allPostsSidebarEntries = document.getElementById('discussion__sidebar-entries');
const discussionLoadingSpinner = document.getElementById('discussion__spinner');
const latestPostsContainer = document.getElementById('latestPosts-container');
const latestPostsSpinner = document.getElementById('latestPosts__spinner');
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

const loadLatestPosts = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const latestPosts = await res.json();
  displayLatestPosts(latestPosts);
};

const displayLatestPosts = (latestPosts) => {
  latestPosts.forEach((post) => {
    latestPostsContainer.innerHTML += `
    <div class="border border-slate-900 border-opacity-20 p-6 rounded-3xl">
      <div class="w-full bg-slate-900 bg-opacity-5 rounded-[20px]">
        <img src=${post.cover_image} alt="">
      </div>

      <div>
        <div class="flex items-center gap-2 mt-4">
          <img src="./Assets/images/publishicon.png" /> <span class="text-slate-900 text-opacity-80 text-base font-normal">${post.author.posted_date ?? 'No publish date'}</span>
        </div>
        <h3 class="text-slate-900 text-lg font-extrabold mt-4 mb-3">${post.title}</h3>
        <p class="text-slate-900 text-opacity-80 text-base font-normal mb-4 min-h-[72px]">${post.description}</p>
        <div class="flex gap-3 ">
          <div><img src=${post.profile_image} class="w-11 h-11 rounded-full" alt="" /></div>
          <div>
            <p class="text-slate-900 text-base font-bold">${post.author?.name}</p>
            <p class="text-slate-900 text-opacity-60 text-sm font-normal">${post.author.designation ?? 'Unknown'}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  });
};

setTimeout(() => {
  loadAllPosts();
  loadLatestPosts();
  discussionLoadingSpinner.style.display = 'none';
  latestPostsSpinner.style.display = 'none';
}, 2000);
