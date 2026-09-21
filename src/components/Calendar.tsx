"use client";
import React, { useState } from 'react';

type DateRange = { start: string, end: string };

export default function Calendar({ bookedDates }: { bookedDates: DateRange[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstDay = new Date(year, month, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const dayNames = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

  const formatDate = (y: number, m: number, d: number) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${y}-${pad(m + 1)}-${pad(d)}`;
  };

  const isBooked = (d: number) => {
    const dateStr = formatDate(year, month, d);
    return bookedDates.some(range => {
      // Un jour est considéré comme occupé s'il fait partie du séjour (le jour de départ est libre)
      return dateStr >= range.start && dateStr < range.end;
    });
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
  }
  
  for (let d = 1; d <= daysInMonth; d++) {
    const booked = isBooked(d);
    
    let bgClass = "bg-green-50 text-green-800 border border-green-100"; 
    if (booked) {
      bgClass = "bg-red-50 text-red-800 line-through opacity-60 border border-red-100";
    }
    
    // Check if it's today
    const today = new Date();
    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
    if (isToday) {
      bgClass += " ring-2 ring-primary ring-offset-1";
    }
    
    days.push(
      <div key={d} className={`h-10 w-10 flex items-center justify-center rounded-md text-sm font-medium ${bgClass}`}>
        {d}
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-[2rem] border-[3px] border-primary shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="cursor-pointer p-2 rounded-full bg-secondary/20 hover:bg-secondary/50 text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h4 className="text-xl font-bold text-primary capitalize">
          {monthNames[month]} {year}
        </h4>
        <button onClick={nextMonth} className="cursor-pointer p-2 rounded-full bg-secondary/20 hover:bg-secondary/50 text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(name => (
          <div key={name} className="h-8 flex items-center justify-center text-sm font-bold text-gray-400">
            {name}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
      
      <div className="mt-6 flex gap-6 text-sm font-medium justify-center text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 border border-green-200 rounded-sm"></div> Libre
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-50 border border-red-200 rounded-sm opacity-60"></div> Réservé
        </div>
      </div>
    </div>
  );
}
