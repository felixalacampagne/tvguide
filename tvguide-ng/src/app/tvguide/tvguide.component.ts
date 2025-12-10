import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // ng add @angular/material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { TvgUtilsService } from '../service/tvg-utils.service';
import { Channel } from '../model/channel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
   selector: 'tvguide-header',
   imports: [
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatSelectModule
   ],
   templateUrl: './tvguide.component.html',
   styleUrl: './tvguide.component.scss'
})
export class TvguideComponent {
   tvgutils = inject(TvgUtilsService);
   http = inject(HttpClient);

   guidePageHtml: any = "";
   nullChannel : Channel = {code:"", name:""};
   nullDay : string = "";
   selDay : string = this.nullDay;
   selChannel : Channel = this.nullChannel;
   constructor()
   {
   }

   dayChanged(event : MatSelectChange)
   {
      console.log("dayChanged: event:%s selDay:%s", event.value, this.selDay);
      this.loadListing(event.value, this.selChannel);
   }

   channelChanged(event : MatSelectChange)
   {
      console.log("channelChanged: event:%s selChannel:%s", JSON.stringify(event.value), JSON.stringify(this.selChannel));
      this.loadListing(this.selDay, event.value);
   }

   loadFavorites()
   {
      this.resetSelctions();
   }

   loadUpcoming()
   {
      this.resetSelctions();
   }

   loadFavouriteList()
   {
      this.resetSelctions();
   }

   loadListing(day : string, channel : Channel)
   {
      if((day == "") || (channel.code == ""))
      {
         return;
      }
      let pageUrl : string = this.tvgutils.getPageURL(day, channel);
      console.log("loadListing: loading page %s", pageUrl);
      this.http.get(pageUrl, {responseType: 'text'})
         .pipe( map((html:any) => this.guidePageHtml = html))
         .subscribe(
         {
            error:  (err) =>
            {
               console.log("loadListing: Error: %s", JSON.stringify(err));
            }
         }
      )
   }

   prevDay()
   {
      this.selDay = this.tvgutils.addDay(this.selDay, -1);
   }

   nextDay()
   {
      this.selDay = this.tvgutils.addDay(this.selDay, +1);
   }

   prevChannel()
   {
      this.selChannel = this.tvgutils.addChannel(this.selChannel, -1);
   }

   nextChannel()
   {
      this.selChannel = this.tvgutils.addChannel(this.selChannel, +1);
   }

   resetSelctions()
   {
      this.selDay = this.nullDay;
      this.selChannel = this.nullChannel;
   }
}
