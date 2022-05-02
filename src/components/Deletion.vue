<template>
    <div class="delete-holder" @click="outsider" id="delBox">
        <div class="delete-box">

            <svg class="close-box"  @click="$emit('clicked', false)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                    fill="currentColor" />
            </svg>

            <div>
                <svg class="attention" width="24" height="24" viewBox="0 0 24 24" fill="#DB3C3ADD" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z"
                        fill="#DB3C3ADD" />
                    <path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z"
                        fill="#DB3C3ADD"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                        fill="#DB3C3ADD"/>
                </svg>

                <span class="hr-line"></span>

                <h5 style="text-align: center;">Hold on buddy !</h5>
                <div class="warn-msg">
                    <p>Hey! We are truly sorry to see you go. Keep in mind that you will loose all of your data.
                    <span>Type your username to confirm deletion:</span></p>
                </div>
            </div>

            <div class="form-delete-profile">
                <input type="text" id="confirmUsername" @keyup="confirmation"/>
                <button id="prDelete" disabled @click="$emit('clicked', true)">Delete</button>
            </div>
            
        
        </div>
    </div>

</template>

<script>

    export default {
        name: 'Deletion',
        
        data () {
            return {
            }
        },

        props: ['username'],

        methods: {
            confirmation(){
                let button = document.getElementById('prDelete');
                (this.$props.username === event.currentTarget.value) ? button.disabled = false : button.disabled = true ;
            },
            outsider(){
                if (event.target.id == 'delBox') this.$emit('clicked', false)
            },
        }
    }
</script>


<style scoped lang="scss">

    .delete-holder{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
        background: #2224;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .delete-box{
        margin-top: 7%;
        max-width: 400px;
        border-radius: 5px;
        border: 1px solid #DDD7;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 50px 50px 50px;
        background-color: white;

        & div:nth-child(1){
            width: 50px;
        }
        & div:nth-child(2){
            width: 100%;
        }
        & div:nth-child(3){
        }
    }
    .close-box{
        display: block;
        margin: 0px 0px 10px auto;
        cursor: pointer;
        transition: transform .4s ease-in-out;
        &:hover {
            transform: rotate(180deg);
        }
    }
    .attention{
        height: 100px;
        width: 100px;
        display: block;
        margin: 0px auto 10px auto;
    }
    h5{
        color: #DB3C3A;
        padding-bottom: 10px;
    }
    .hr-line{
        height: 2px;
        display: block;
        background-color: #DB3C3ADD;
        width: 50px;
        margin: 0px auto 15px auto;
    }

    .warn-msg{
        padding: 15px 0 25px 0;
        p{
            font-size: 14px;
            line-height: 20px;
            color: #222B; 
        }

        span{
            font-weight: 600;
        }
    }

    input{
        width: 100%;
        padding: 5px 5px;
        margin-bottom: 15px;
        outline: 0;
        border: 1.5px solid #C8C8C8;

        &:hover{
            border-color: #DB3C3ADD;
        }
        &:focus{
            border-color: #DB3C3ADD;
        }
    }
    

    .form-delete-profile{
        width: 100%;
    }

    button{
        height: 30px;
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 3px;
        background-color: #DB3C3A;
        color: #FFFFFA;
        border: 1px solid transparent;
        width: 100%;

        &:disabled{
            background-color: #DB3C3A99;
            cursor: auto;
        }
    }

    @media (max-width: 430px) {
        .delete-box{
            width: 100%;
            height: 100%;
            justify-content: center;
        }
        .close-box{
            position: absolute;
            top: 0;
            right: 0;
            margin: 15px 15px 0px 0px;
        }
    }


</style>