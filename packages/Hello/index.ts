import Hello from './Hello.vue'

export default function (Vue:any){
    Vue.component(Hello.name, Hello);
}