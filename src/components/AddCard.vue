<template>
    <div class="adding-form adding-form-card">
        <div class="pop-up-form-top">
            <h4>New card</h4>
            <p>Create a new card by giving it a question, answer & image</p>
        </div>

        <form class="pop-up-form">
            <el-input
                type="text"
                v-model="form.question"
                @keyup="form.question"
                placeholder="Question"
            />
            <el-input
                type="text"
                v-model="form.answer"
                @keyup="form.answer"
                placeholder="Answer"
            />
            <label for="file-input-card">
               <p>upload image</p>
            </label>
            <p class="file-name" 
               :class="this.file_name ? 'fade-enter' : null"
            >{{ this.file_name }}</p>
            <input
                type="file"
                id="file-input-card"
                name="card-img"
                accept="image/png, image/jpeg"
                @change="handleFileChange($event)"
                class="upload-img-card"
            />
        </form>
        

        <div class="btns-modal-form">
            <button @click="$emit('close')">Cancel</button>
            <button type="submit" @click="upload">Add card</button>
        </div>
    </div>
</template>

<script>
import { URI, axios } from "@/plugins/index.js";

export default {
    name: "AddCard",

    data() {
        return {
            form: {
                question: "",
                answer: "",
                img_url: "",
            },
            errors: [],
            file: null,
            file_name: '',
            cloudName: "deedfk00w",
            fileContents: null,
            formData: null,
        };
    },

    methods: {
        // function to handle file info obtained from local
        // file system and set the file state
        handleFileChange: function (event) {
            //returns an array of files even though multiple not used
            this.file = event.target.files[0];
            this.file_name = this.file.name;
        },

        prepareFormData: function () {
            this.formData = new FormData();
            this.formData.append("upload_preset", "kram-upload");
            this.formData.append("file", this.fileContents);
        },

        async upload() {
            if (!this.file) this.createCard();
            let results;
            let reader = new FileReader();

            reader.addEventListener(
                "load",
                function () {
                    this.fileContents = reader.result;
                    this.prepareFormData();
                    let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;

                    let requestObj = {
                        url: cloudinaryUploadURL,
                        method: "POST",
                        data: this.formData,
                    };

                    axios(requestObj)
                        .then(async (response) => {
                            results = await response.data.secure_url;
                            this.form.img_url = results;
                            this.createCard();
                        })
                        .catch((error) => {
                            this.errors.push(error);
                            console.log(this.error);
                        });
                }.bind(this),
                false
            );
            // call for file read if there is a file
            if (this.file && this.file.name) {
                reader.readAsDataURL(this.file);
            }
            return await results;
        },

        async createCard() {
            const json = JSON.stringify(this.form);

            await axios
                .post(`${URI}/cards/${localStorage.getItem("_id")}`, json, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        [this.form.question, this.form.answer] = "";
                        console.log(res);
                        document.getElementById("file-input-card").value = "";
                        this.$emit("clicked", res.data);
                    }
                })
                .catch((error) => {
                    [this.form.question, this.form.answer] = "";
                    if (error)
                        this.formError =
                            "Question or answer format invalid invalid";
                });
        },
    },
};
</script>

<style scoped lang="scss">
.adding-form-card {
    max-width: 300px;
    margin-right: 15px;

    .el-input {
        padding-bottom: 13px;
    }
    .upload-img-card {
        display: none;
    }
    label p{
        font-size: 14px;
        color: white;
        background-color: #0079c2;
        padding: 8px 12px;
        border-radius: 3px;
        margin-bottom: 3px;
        cursor: pointer;
        width: fit-content;

        &:hover, &:active{
           opacity: .7;
        }
    }
    .file-name {
        font-size: 12px;
        color: #2229;
        padding-top: 10px;
        height: 24px;
    }
}

@keyframes append-animate {
	from {
		transform: translateY(-10px);
		opacity: 0;
	}
	to {
		transform: translateY(0px);
		opacity: 1;	
	}
}

/* animate new box */
.fade-enter {
	animation: append-animate .25s linear;
}
</style>
