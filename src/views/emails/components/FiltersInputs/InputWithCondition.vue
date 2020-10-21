<template>
    <b-form-group :label="filter.text">
        <b-row no-gutters>
            <b-col cols="8" sm="9">
                <b-form-input v-model="filter.value"></b-form-input>
            </b-col>
            <b-col cols="4" sm="3">
                <b-form-select v-model="filter.condition" :options="filter.conditions"></b-form-select>
            </b-col>
        </b-row>
    </b-form-group>
</template>

<script>
export default {
    props: ['filter']
}
</script>

<style>

</style>
