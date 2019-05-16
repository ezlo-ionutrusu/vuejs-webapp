<template>
  <section>
    <SearchBar
      hint="Search hint"
      v-model="searchPhrase"
      :text="searchPhrase"
      @textChange="onTextChanged"
      @submit="onSubmit"
    />
    <ActionBar style="margin-top:15px">
      <StackLayout orientation="horizontal">
        <Label text="NativeScript" verticalAlignment="center"/>
        <Label text="Vue Web" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>
    <ActionBar title="My App">
      <ActionItem
        @tap="onTapShare"
        ios.systemIcon="9"
        ios.position="left"
        android.systemIcon="ic_menu_share"
        android.position="actionBar"
        webIcon="fa fa-share"
      />
      <ActionItem
        @tap="onTapDelete"
        ios.systemIcon="16"
        ios.position="right"
        text="delete"
        android.position="popup"
        webIcon="fa fa-remove"
      />
    </ActionBar>
  </section>
</template>
<script>
import {
  ActionBar,
  ActionItem,
  Label,
  StackLayout,
  SearchBar
} from "nativescript-vue-web";

export default {
  data() {
    return {
      searchPhrase: null
    };
  },
  components: {
    ActionBar,
    Label,
    ActionItem,
    StackLayout,
    SearchBar
  },
  methods: {
    onTapShare() {},
    onTapDelete() {},
    onTextChanged() {},
    onSubmit() {
      alert(this.searchPhrase);
    }
  }
};
</script>
