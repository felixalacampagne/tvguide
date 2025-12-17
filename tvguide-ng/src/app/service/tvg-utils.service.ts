import { Injectable } from '@angular/core';
import { Channel } from '../model/channel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvgUtilsService {

   private days : string[] = [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
   ];


  // Could maybe populate this from the STB?
  // Could maybe use enum?
   private channels : Channel[] = [
      new Channel("BBC 1 SE", "BBC1SEHD"),
      new Channel("BBC 2", "BBC2HD"),
      new Channel("BBC 3", "BBC3HD"),
      new Channel("BBC 4", "BBC4HD"),
      new Channel("Channel 4 HD", "Channel4HD"),
      new Channel("ITV 1", "ITV1HD"),
      new Channel("ITV 2", "ITV2HD"),
      new Channel("ITV 3", "ITV3HD"),
      new Channel("ITV 4", "ITV4HD"),
      new Channel("Five HD",       "FiveHD"),
      new Channel("VRT 1",        "VRT1"),
      new Channel("Canvas",       "Canvas"),
      new Channel("VTM",          "VTM"),
      new Channel("VTM 2",        "VTM2"),
      new Channel("VTM 3",        "VTM3"),
      new Channel("VTM 4",        "VTM4"),
      new Channel("Play",         "Play"),
      new Channel("Play Fictie",  "PlayFictie"),
      new Channel("Play Actie",   "PlayActie"),
      new Channel("Play Reality", "PlayReality"),
      new Channel("Ned 1",        "Ned1"),
      new Channel("Ned 2",        "Ned2"),
      new Channel("Ned 3",        "Ned3"),
      new Channel("Channel4",     "Channel4"),
      new Channel("E4",           "E4"),
      new Channel("More4",        "More4"),
      new Channel("Film4",        "Film4"),
      new Channel("5USA",         "5USA"),
      new Channel("5STAR",        "5STAR"),
      new Channel("5SELECT",      "5SELECT"),
      new Channel("5ACTION",      "5ACTION"),
      new Channel("Five",         "Five"),
      new Channel("ITV1 +1",       "ITV1+1"),
      new Channel("ITV2 +1",       "ITV2+1"),
      new Channel("ITV3 +1",       "ITV3+1"),
      new Channel("ITV4 +1",       "ITV4+1"),
      new Channel("Channel4 +1",   "Channel4+1"),
      new Channel("Five +1",       "Five+1"),
      new Channel("E4 +1",         "E4+1"),
      new Channel("More4 +1",      "More4+1"),
      new Channel("Film4 +1",      "Film4+1"),
      new Channel("5USA +1",       "5USA+1"),
      new Channel("5STAR +1",      "5STAR+1")
      // ,new Channel("5SELECT +1",    "5SELECT+1")
      // ,new Channel("5ACTION +1",    "5ACTION+1")
    // , new Channel("", ""),
   ];

   private serverhost : string;
   private applocation : string; // points to the root of the webapp, ie. /tvguide. Used for /crit/critlist.php
   private tvgurlpfx : string = '';
   constructor() {
      this.serverhost = window.location.origin;
      this.applocation = environment.apppath;
      this.tvgurlpfx = this.serverhost + environment.tvgpath
   }

   public getDays() : string[]
   {
      return this.days;
   }

   public getDay(dayno : number) : string
   {
      return this.days[dayno % this.days.length];
   }

   public getChannels() : Channel[]
   {
      return this.channels;
   }

   // Overloading doesn't really exist in Typescript
   public getPageURL(name : string) : string;
   public getPageURL(day : string, channel : Channel) : string
   public getPageURL(nameorday: string, channel? : Channel) : string
   {
      if( channel == undefined )
      {
         if(nameorday.startsWith("/"))
         {
            // Hack for the favouritelist page.
            return this.serverhost + this.applocation + nameorday;
         }

         return this.tvgurlpfx + nameorday + ".htm";
      }
      // Is there a printf for typescript??
      return this.tvgurlpfx + channel.code + "_" + nameorday + ".html";

   }


   public addDay(day : string, dir : number) : string
   {
      let i : number = this.days.findIndex(d => (d == day));
      if(i < 0)
      {
         i = 0;
      }
      else
      {
         if(dir > 0)
         {
            i++;
            if(i >= this.days.length)
            {
               i = 0;
            }
         }
         else
         {
            i--;
            if( i < 0)
            {
               i = this.days.length - 1;
            }
         }
      }
      return this.days[i];
   }

   public addChannel(chan : Channel, dir : number) : Channel
   {
      let i : number = this.channels.findIndex(c => (c.code == chan.code));
      if(i < 0)
      {
         i = 0;
      }
      else
      {
         if(dir > 0)
         {
            i++;
            if(i >= this.channels.length)
            {
               i = 0;
            }
         }
         else
         {
            i--;
            if( i < 0)
            {
               i = this.channels.length - 1;
            }
         }
      }
      return this.channels[i];
   }
}
