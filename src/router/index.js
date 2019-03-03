import Vue from 'vue'
import Router from 'vue-router'
import Markdown from '@/components/Markdown'
import index from '@/components/index/index'
import about from '@/components/about/about'
import introduce from '@/components/about/introduce/introduce'
import standard from '@/components/about/standard/standard'
import pattern from '@/components/about/pattern/pattern'
import Administration from '@/components/about/Administration/Administration'
import direction from '@/components/about/direction/direction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/Markdown',
      name: 'Markdown',
      component: Markdown
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      children: [
        {
          path: '',
          redirect: 'introduce'
        },
        {
          path: 'introduce',
          component: introduce
        },
        {
          path: 'standard',
          component: standard
        },
        {
          path: 'pattern',
          component: pattern
        },
        {
          path: 'Administration',
          component: Administration
        },
        {
          path: 'direction',
          component: direction
        }
      ]
    }
  ]
})
