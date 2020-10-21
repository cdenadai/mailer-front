<template>
    <div>
        <div class="little-label">{{label}}</div>
        <div class="value">{{field}}</div>
    </div>
</template>

<script>
export default {
    props: ['label', 'field']
}
</script>

<style lang="scss" scoped>
    .little-label {
        font-size: 12px;
        color: #888;
        margin-bottom: 0;
    }

    .value {
        margin-bottom: 3px;
    }
</style>