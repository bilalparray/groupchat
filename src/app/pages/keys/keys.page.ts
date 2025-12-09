import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonInfiniteScroll,
  IonItemOptions,
  IonLabel,
  IonBadge,
  IonItemSliding,
  IonCardContent,
  IonList,
  IonItem,
  IonAvatar,
  IonCard,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItemOption,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  createOutline,
  key,
  logOutOutline,
  trashOutline,
} from 'ionicons/icons';

interface KeyModel {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'pending' | string;
  totalGuests?: number;
  activeCount?: number;
  inactiveCount?: number;
}

@Component({
  selector: 'app-keys',
  templateUrl: './keys.page.html',
  styleUrls: ['./keys.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    IonItemOption,

    IonIcon,
    IonButton,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonContent,
    IonAvatar,
    IonItem,
    IonList,

    IonItemSliding,
    IonBadge,
    IonLabel,
    IonHeader,
    IonInfiniteScroll,
    IonItemOptions,
    CommonModule,
  ],
})
export class KeysPage implements OnInit {
  // Full in-memory dataset you provided (use this as source of truth)
  private allKeys: KeyModel[] = [
    {
      id: '1',
      name: 'Main Door',
      key: 'A1B2-C3D4-E5F6',
      status: 'active',
      totalGuests: 15,
      activeCount: 12,
      inactiveCount: 3,
    },
    {
      id: '2',
      name: 'Back Gate',
      key: 'Z9Y8-X7W6-V5U4',
      status: 'inactive',
      totalGuests: 8,
      activeCount: 2,
      inactiveCount: 6,
    },
    {
      id: '3',
      name: 'Guest Room',
      key: 'G1H2-I3J4-K5L6',
      status: 'pending',
      totalGuests: 4,
      activeCount: 1,
      inactiveCount: 3,
    },
    {
      id: '4',
      name: 'Side Entrance',
      key: 'S1E2-N3T4-R5Y6',
      status: 'active',
      totalGuests: 10,
      activeCount: 7,
      inactiveCount: 3,
    },
    {
      id: '1',
      name: 'Main Door',
      key: 'A1B2-C3D4-E5F6',
      status: 'active',
      totalGuests: 15,
      activeCount: 12,
      inactiveCount: 3,
    },
    {
      id: '2',
      name: 'Back Gate',
      key: 'Z9Y8-X7W6-V5U4',
      status: 'inactive',
      totalGuests: 8,
      activeCount: 2,
      inactiveCount: 6,
    },
    {
      id: '3',
      name: 'Guest Room',
      key: 'G1H2-I3J4-K5L6',
      status: 'pending',
      totalGuests: 4,
      activeCount: 1,
      inactiveCount: 3,
    },
    {
      id: '4',
      name: 'Side Entrance',
      key: 'S1E2-N3T4-R5Y6',
      status: 'active',
      totalGuests: 10,
      activeCount: 7,
      inactiveCount: 3,
    },
    {
      id: '1',
      name: 'Main Door',
      key: 'A1B2-C3D4-E5F6',
      status: 'active',
      totalGuests: 15,
      activeCount: 12,
      inactiveCount: 3,
    },
    {
      id: '2',
      name: 'Back Gate',
      key: 'Z9Y8-X7W6-V5U4',
      status: 'inactive',
      totalGuests: 8,
      activeCount: 2,
      inactiveCount: 6,
    },
    {
      id: '3',
      name: 'Guest Room',
      key: 'G1H2-I3J4-K5L6',
      status: 'pending',
      totalGuests: 4,
      activeCount: 1,
      inactiveCount: 3,
    },
    {
      id: '4',
      name: 'Side Entrance',
      key: 'S1E2-N3T4-R5Y6',
      status: 'active',
      totalGuests: 10,
      activeCount: 7,
      inactiveCount: 3,
    },
    {
      id: '1',
      name: 'Main Door',
      key: 'A1B2-C3D4-E5F6',
      status: 'active',
      totalGuests: 15,
      activeCount: 12,
      inactiveCount: 3,
    },
    {
      id: '2',
      name: 'Back Gate',
      key: 'Z9Y8-X7W6-V5U4',
      status: 'inactive',
      totalGuests: 8,
      activeCount: 2,
      inactiveCount: 6,
    },
    {
      id: '3',
      name: 'Guest Room',
      key: 'G1H2-I3J4-K5L6',
      status: 'pending',
      totalGuests: 4,
      activeCount: 1,
      inactiveCount: 3,
    },
    {
      id: '4',
      name: 'Side Entrance',
      key: 'S1E2-N3T4-R5Y6',
      status: 'active',
      totalGuests: 10,
      activeCount: 7,
      inactiveCount: 3,
    },
    {
      id: '1',
      name: 'Main Door',
      key: 'A1B2-C3D4-E5F6',
      status: 'active',
      totalGuests: 15,
      activeCount: 12,
      inactiveCount: 3,
    },
    {
      id: '2',
      name: 'Back Gate',
      key: 'Z9Y8-X7W6-V5U4',
      status: 'inactive',
      totalGuests: 8,
      activeCount: 2,
      inactiveCount: 6,
    },
    {
      id: '3',
      name: 'Guest Room',
      key: 'G1H2-I3J4-K5L6',
      status: 'pending',
      totalGuests: 4,
      activeCount: 1,
      inactiveCount: 3,
    },
    {
      id: '4',
      name: 'Side Entrance',
      key: 'S1E2-N3T4-R5Y6',
      status: 'active',
      totalGuests: 10,
      activeCount: 7,
      inactiveCount: 3,
    },
    {
      id: '1',
      name: 'Main Door',
      key: 'A1B2-C3D4-E5F6',
      status: 'active',
      totalGuests: 15,
      activeCount: 12,
      inactiveCount: 3,
    },
    {
      id: '2',
      name: 'Back Gate',
      key: 'Z9Y8-X7W6-V5U4',
      status: 'inactive',
      totalGuests: 8,
      activeCount: 2,
      inactiveCount: 6,
    },
    {
      id: '3',
      name: 'Guest Room',
      key: 'G1H2-I3J4-K5L6',
      status: 'pending',
      totalGuests: 4,
      activeCount: 1,
      inactiveCount: 3,
    },
    {
      id: '4',
      name: 'Side Entrance',
      key: 'S1E2-N3T4-R5Y6',
      status: 'active',
      totalGuests: 10,
      activeCount: 7,
      inactiveCount: 3,
    },
  ];

  // Visible list used by template
  keys: KeyModel[] = [];

  // pagination state (local)
  page = 0;
  pageSize = 2; // change to preferred page size
  totalCount = 0;
  infiniteDisabled = false;
  loading = false;

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    addIcons({
      trashOutline,
      createOutline,
      key,
      logOutOutline,
    });
  }

  ngOnInit(): void {
    // initialize total and load first page
    this.totalCount = this.allKeys.length;
    this.resetAndLoad();
  }

  private async resetAndLoad() {
    this.page = 0;
    this.keys = [];
    this.infiniteDisabled = false;
    await this.loadPage();
  }

  private async loadPage() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    try {
      const start = this.page * this.pageSize;
      const end = start + this.pageSize;
      const items = this.allKeys.slice(start, end);

      // Append new items
      this.keys = [...this.keys, ...items];

      // Update counters and pagination flags
      if (
        this.keys.length >= this.allKeys.length ||
        items.length < this.pageSize
      ) {
        this.infiniteDisabled = true;
      } else {
        this.page += 1;
      }
    } catch (err) {
      const t = await this.toastCtrl.create({
        message: 'Failed to load keys.',
        duration: 2000,
      });
      await t.present();
      this.infiniteDisabled = true;
    } finally {
      this.loading = false;
    }
  }

  // wired to ionInfinite
  async loadMore(event: CustomEvent) {
    await this.loadPage();
    try {
      (event.target as any).complete();
    } catch {
      // ignore
    }
  }

  // UI action handlers
  openKeyDetail(k: KeyModel) {
    // navigate to detail if implemented
    // this.router.navigate(['/keys', k.id]);
  }

  onEdit(ev: Event, k: KeyModel) {
    ev.stopPropagation();
    this.editKey(k);
  }

  onDelete(ev: Event, k: KeyModel) {
    ev.stopPropagation();
    this.deleteKey(k);
  }

  editKey(k: KeyModel) {
    // placeholder: open edit UI
    console.log('edit', k);
  }

  async deleteKey(k: KeyModel) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm delete',
      message: `Delete key "${k.name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            // remove from source array
            this.allKeys = this.allKeys.filter((x) => x.id !== k.id);
            // update total
            this.totalCount = this.allKeys.length;
            // re-render paginated view safely
            await this.resetAndLoad();
            const t = await this.toastCtrl.create({
              message: 'Key deleted',
              duration: 1500,
            });
            await t.present();
          },
        },
      ],
    });

    await alert.present();
  }

  // Add key via simple alert; updates local array and visible list
  async presentAlertWithInput() {}

  logout() {
    // implement logout logic if needed
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
