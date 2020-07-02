<template>
  <v-layout row wrap class="pa-1">
    <v-flex xs12 v-if="!eventRewardTpl">
      <v-alert>
        Loading...
      </v-alert>
    </v-flex>
    <v-flex xs12 v-else>
      <v-layout row wrap>
        <!-- Reward list selection table -->
        <v-flex xs8>
          <RewardTable :rewardTemplate="eventRewardTpl[0]"></RewardTable>
        </v-flex>
        <v-flex xs4>
          <!-- Reward list -->
          <RewardList></RewardList>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs4 v-for="(event, index) in eventRewardTpl.filter((obj, index) => index > 0)" :key="index">
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
    RewardList
  }
}
</script>

<style>

</style>
