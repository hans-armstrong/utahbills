<template>
  <div class="wrapper">
    <div class="headerWrapper shadow-md flex justify-center py-6 sm:py-10 md:py-6.25">
      <header class="flex flex-wrap w-full h-fit max-w-screen-2xl">
        <div class="basis-1/2 sm:basis-1/3 pl-3 sm:pl-[5%]">
          <RouterLink to="/">
            <h1 class="w-fit">Utah Bills</h1>
          </RouterLink>
        </div>
        <nav class="basis-1/2 sm:basis-1/3 flex flex-wrap items-center sm:pl-4  pt-1">
            <RouterLink class="basis-1/2 text-center text-md md:text-xl pt-1" to="/" @mouseover="startAnimation" @mouseleave="stopAnimation">
              <span>HOME</span>
              <div class="nav-bar bg-blue-950 h-1 w-1 m-auto opacity-0 rounded-3xl"></div>
            </RouterLink>
            <RouterLink class="basis-1/2 text-center text-md md:text-xl pt-1" to="/bills" @mouseover="startAnimationRose"
              @mouseleave="stopAnimationRose"><span>BILLS</span>
              <div class="nav-bar2 bg-blue-950 h-1 w-0 m-auto opacity-0 rounded-3xl"></div>
            </RouterLink>
        </nav>
        
      </header>
    </div>
    <main class="flex justify-center">
      <RouterView class="w-full"></RouterView> <!--single page, changing view of the single page-->
    </main>
    <footer class="p-6 text-sm bg-blue-950 text-white text-center"><div class="flex flex-col max-w-screen-xl m-auto">
<div>Disclaimer: This site is not an official government site and does not claim to be completely accurate. 
<br>  
All information is gathered from two public sources (the official Utah State developer API and the Legiscan API) and is subject to human input error. 
<br>
During sessions, data displayed may not be complete as changes are not immediatley reflected in the data from the official Utah State Developer API (usually takes a day for them to update it). 
<br>
Along with Legiscan api data being sometimes days behind. Visit the <a class="link" href="https://le.utah.gov/bills/bills_By_Session.jsp">Utah State Legislature Website</a> for your source of truth if you find a bill you want to track!
<br>
When the general sessions ends, you can expect all data to be inputted and reflected here. 
<br>
Both API's data sources and website may be subject to human error
<br>
Thanks for visiting! <br><br>
</div>
<div class="mt-1">This website was created by a college student as apart of a school project, new features and improvements will be continually added!</div>
<div class="mt-1">Icons provided by (© Icongeek26 - stock.adobe.com)</div>
<div class="mt-1">Copyright <i class="fa-regular fa-copyright"></i> 2025</div>
    </div></footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { data } from './shared/data'
import { RouterLink, RouterView } from 'vue-router'
import { animate } from 'motion'

// <!-- /class="nav-bar bg-blue-950 h-2 w-1/3 m-auto" -->

// onMounted(() => {
//   animate(".nav-bar", { "width": "33%" }, { duration: .7 })
// })

function startAnimation() {
  animate(".nav-bar", { "width": "33%", opacity: 100 }, { duration: .4 })
}

function stopAnimation() {
  animate(".nav-bar", { "width": "16px", opacity: 0 }, { duration: .3 })
}
function startAnimationRose() {
  animate(".nav-bar2", { "width": "33%", opacity: 100 }, { duration: .4 })
}

function stopAnimationRose() {
  animate(".nav-bar2", { "width": "16px", opacity: 0 }, { duration: .3 })
}
</script>



<style scoped>

.link {
    text-decoration: underline;
    @apply hover:text-rose-500
}

</style>
