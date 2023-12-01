import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AudioResolverService } from './dashboard/audio-resolver.service';
import { PentagramService } from './dashboard/pentagram.service';
import { PlayerService } from './dashboard/player.service';
import { UndoRedoBeatService } from './dashboard/undo-redo-beat.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [
    PentagramService,
    PlayerService,
    UndoRedoBeatService,
    AudioResolverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
