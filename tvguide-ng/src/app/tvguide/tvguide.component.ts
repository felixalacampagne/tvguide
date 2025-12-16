import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // ng add @angular/material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { TvgUtilsService } from '../service/tvg-utils.service';
import { Channel } from '../model/channel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
   selector: 'tvguide-header',
   imports: [
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule
   ],
   templateUrl: './tvguide.component.html',
   styleUrl: './tvguide.component.scss'
})
export class TvguideComponent {
   tvgutils = inject(TvgUtilsService);
   http = inject(HttpClient);
   sanitizer = inject(DomSanitizer);

   guidePageHtml: any = "";
   guidePageURL: SafeResourceUrl = "";
   nullChannel : Channel = {code:"", name:""};
   nullDay : string = "";
   selDay : string = this.nullDay;
   selChannel : Channel = this.nullChannel;
   constructor()
   {
   }

   ngOnInit()
   {
      let d : number = new Date().getDay();
      console.log("ngOnInit: day:%d name:%s", d, this.tvgutils.getDay(d));
      this.selDay = this.tvgutils.getDay(d);
      this.loadFavorites();
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
      let pageUrl : string = this.tvgutils.getPageURL("00favorites");
      console.log("loadFavorites: loading page %s", pageUrl);
      this.guidePageURL = this.sanitizer.bypassSecurityTrustResourceUrl(pageUrl);
      this.resetSelctions();
      /*
      this.http.get(pageUrl, {responseType: 'text'})
         .pipe( map((html:any) => this.guidePageHtml = html))
         .subscribe(
         {
            error:  (err) =>
            {
               console.log("loadFavorites: Error: %s", JSON.stringify(err));
            },
            complete: () =>
            {
               this.resetSelctions();
            }
         }
      )*/
   }

   loadUpcoming()
   {
      let pageUrl : string = this.tvgutils.getPageURL("00newseries");
      console.log("loadUpcoming: loading page %s", pageUrl);
      this.guidePageURL = this.sanitizer.bypassSecurityTrustResourceUrl(pageUrl);
      this.resetSelctions();
      // this.http.get(pageUrl, {responseType: 'text'})
      //    .pipe( map((html:any) => this.guidePageHtml = html))
      //    .subscribe(
      //    {
      //       error:  (err) =>
      //       {
      //          console.log("loadUpcoming: Error: %s", JSON.stringify(err));
      //       },
      //       complete: () =>
      //       {
      //          this.resetSelctions();
      //       }
      //    }
      // )
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
      this.guidePageURL = this.sanitizer.bypassSecurityTrustResourceUrl(pageUrl);
      // this.http.get(pageUrl, {responseType: 'text'})
      //    .pipe( map((html:any) => this.guidePageHtml = html))
      //    .subscribe(
      //    {
      //       error:  (err) =>
      //       {
      //          console.log("loadListing: Error: %s", JSON.stringify(err));
      //       }
      //    }
      // )
   }

   prevDay()
   {
      this.selDay = this.tvgutils.addDay(this.selDay, -1);

      // Changing the value changes the display but does NOT cause the change event to fire
      // so must do it manually
      this.loadListing( this.selDay, this.selChannel );
   }

   nextDay()
   {
      this.selDay = this.tvgutils.addDay(this.selDay, +1);
      this.loadListing( this.selDay, this.selChannel );
   }

   prevChannel()
   {
      this.selChannel = this.tvgutils.addChannel(this.selChannel, -1);
      this.loadListing( this.selDay, this.selChannel );
   }

   nextChannel()
   {
      this.selChannel = this.tvgutils.addChannel(this.selChannel, +1);
      this.loadListing( this.selDay, this.selChannel );
   }

   resetSelctions()
   {
      // this.selDay = this.nullDay;
      this.selChannel = this.nullChannel;
   }
}
