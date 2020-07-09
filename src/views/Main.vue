<template>
  <v-layout row wrap class="pa-1">
    <v-flex xs12 v-if="!eventRewardTpl">
      <v-alert>
        Loading...
      </v-alert>
    </v-flex>
    <v-flex xs12 v-else>
      <v-layout row wrap>
        <!-- Selection box -->
        <v-flex xs12>
          <StoreCars></StoreCars>
        </v-flex>

        <!-- Reward list -->
        <v-flex xs12 md4>
          <RewardList></RewardList>
        </v-flex>
        <!-- Reward list selection table -->
        <v-flex xs12 md8>
          <RewardTable :rewardTemplate="eventRewardTpl[0]"></RewardTable>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 md4 v-for="(event, index) in eventRewardTpl.filter((obj, index) => index > 0)" :key="index">
          <RewardTable :rewardTemplate="event"></RewardTable>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import RewardTable from '@/components/RewardTable'
import RewardList from '@/components/RewardList'
import StoreCars from '@/components/StoreCars'
export default {
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      eventRewardTpl: 'EventRewardTemplate/getData' // Event reward Template Data
    })
  },
  components: {
    RewardTable,
    RewardList,
    StoreCars
  }
}
</script>

<style>

</style>
