<template>
    <button>
        <router-link to="/logout" @click="logout">
            <img src="@/assets/log-off.svg"/> <p>Sign out </p>
        </router-link>
    </button>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';


    export default {
        name: 'Logout',
        
        data () {
            return {
                id: null,
                token: null
            }
        },

        mounted () {},

        methods: {
            async logout(){
                
                let _id = sessionStorage.getItem('_id');
                this.id = _id;
                
                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 
                        
                            axios.delete(`${ URI }/users/logout/${ this.id }`, {
                            headers: {
                                    Authorization: `Bearer ${this.token}`,
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then((res) => {
                                if(res.status === 200) {
                                    sessionStorage.removeItem('_id');
                                    this.token = null;
                                    sessionStorage.setItem('session', false);
                                    this.$router.push({ path : '/' });
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        console.log("error: " + error);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    button {
        border-width:0;
        background-color: transparent;
        a{
            color: #DB3C3A;
            text-decoration: none;
            font-size: 16px;
            display: flex;
            align-items: center;
        }
        img{
            height: 18px;
            margin-right: 4px;
        }
    }

@media (min-width: 480px) {
    button:hover{
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);

        @keyframes shake {
            10%, 90% {
                transform: translate3d(-1px, 0, 0);
            }
            20%, 80% {
                transform: translate3d(2px, 0, 0);
            }
            30%, 50%, 70% {
                transform: translate3d(-4px, 0, 0);
            }
            40%, 60% {
                transform: translate3d(4px, 0, 0);
            }
        }
    }
}
</style>
