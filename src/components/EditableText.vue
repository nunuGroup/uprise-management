<script>
import store from '../store';

export default {
    name: 'EditableText',
    data() {
        return {
            text: null
        }
    },
    props: {
        rel: String,
        align: String,
        width: String
    },
    mounted() {
        this.fetchText();
        //console.log('edit mode?: ', this.editMode);
    },
    computed: {
        editMode() {
            return store.state.editMode;
        }
    },
    methods: {
        fetchText() {
            this.fireFetch("text", "rel == $rel", (docs) => {
                docs.forEach((doc) => {
                   // console.log(doc.data());
                    this.text = doc.data().value;
                    //console.log(this.text);
                });
            });
        }
    }
}
</script>

<template>
  <div :class="( !editMode ? '' : 'editable-text' )">
    <div class="icon editable-text-icon"></div>
        <input
            v-if="editMode"
            type="textarea" 
            :style="'text-align:' + align + '; width:' + width"
            class="editable-text-input" 
            :value="text" 
        />
        <p :style="'text-align:' + align">{{ text }}</p>
    </div> 
</template>

<style scoped lang="scss">
@import '../assets/styles/global';

.editable-text-input {
    color: white;
    border: none;
    background: transparent;
    //padding: 12px 0px;
}

p {
    line-height: 1.5;
}

input {
    width: 100%;
    padding: 12px 12px;
}

</style>