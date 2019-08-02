  <template>
  <div class="home-artist-carousel">
    <hooper :settings="hooperSettings">
      <slide v-for="i in items" :key="i.id">
        <ArtistItem :artist="i" />
      </slide>
    </hooper>
  </div>
</template>

  <script>
import ArtistItem from "@/components/ArtistItem";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
export default {
  name: "components.home_artists_carousel",
  props: ["items"],
  components: {
    ArtistItem,
    Hooper,
    Slide
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 3,
        rtl: true,
        wheelControl: false,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 4
          },
          1000: {
            itemsToShow: 7,
            pagination: "fraction"
          },
          1512: {
            itemsToShow: 8
          },
          1750: {
            itemsToShow: 9
          }
        }
      },
      artist: {
        name: "test",
        image:
          "https://dl.taksound.com/cover/Epicure Band - Rap Dars Midam_5c2e4f73db459.jpg"
      }
    };
  }
};
</script>

  <style lang="scss">
.home-artist-carousel {
  height: 170px;
  .hooper-slide {
    margin: 0 8px;
  }
}
</style>
