"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('json', json);


export default function Home() {
  const [format, setFormat] = useState('');
  const [fields, setFields] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [code, setCode] = useState('');

  const saveOptions = ["json", "csv", "xlsx"];
  const fieldOptions = ["Asin", "Url"];

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const url = `https://server-delta-rouge.vercel.app/amazon/?q=${query}&format=${format}&fields=${fields.join(',')}`;

      // Create a config object for the axios request
      const config = {
        url,
        method: 'GET',
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const total = progressEvent.total;
          if (total > 0) {
            const progress = Math.round((progressEvent.loaded * 100) / total);
            console.log('Progress:', progress); // Check the progress value
            setProgress(progress);
          }
        },
      };

      // Make a GET request to the URL
      const response = await axios(config);

      // Create a URL object from the blob data
      const urlObject = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = urlObject;
      link.setAttribute('download', `data.${format}`);

      // Append the anchor element to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the anchor element and revoking the URL object
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };


 const toggleField = (field) => {
     if (fields.includes(field)) {
      setFields(fields.filter((f) => f !== field));
     } else {
      setFields([...fields, field]);
     }
   };



   const toggleSelectAll = () => {
     if (fields.length === fieldOptions.length) {
       setFields([]);
     } else {
       setFields([...fieldOptions]);
     }
   };

  const handlePreview = async () => {
    try {
      setIsLoading(true);

      // Construct the URL with the selected format, query, and fields
      const url = `https://server-delta-rouge.vercel.app/amazon/?q=${query}&format=${format}&fields=${fields.join(',')}`;

      // Make a GET request to the URL
      const response = await axios.get(url);

      // Update the code state with the fetched data
      setCode(JSON.stringify(response.data, null, 2));
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <main className=' space-y-4'>
      <div className="ml-[80px] flex gap-4 mr-[24px]">
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)} />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Save as" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {saveOptions.map((s) => (
                <SelectItem key={s} value={s} onClick={() => setFormat(s)}>
                  .{s}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

         <Popover >
          <PopoverTrigger asChild>
            <Button variant="outline">Select fields</Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className='flex m-3 ml-4 gap-2 justify-start'>
              <Checkbox
                checked={fields.length === fieldOptions.length}
                onCheckedChange={toggleSelectAll}
              />
              <Label htmlFor="select-all">Select All</Label>
            </div>
            {
              fieldOptions.map((f) => (
                <div className='flex m-3 ml-4 gap-2 justify-start ' key={f}>
                  <Checkbox
                    checked={fields.includes(f)}
                    onCheckedChange={() => toggleField(f)}
                  />
                  <Label htmlFor={f}>{f}</Label>
                </div>
              ))
            }
          </PopoverContent>
        </Popover> 
        <Button onClick={handleSave}>Download</Button>
        <Button onClick={handlePreview}>Preview</Button>
        {isLoading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="text-center">Downloading...</div>
              <div className="flex items-center justify-center mt-2">
                <div className="w-32 bg-gray-300 rounded-full">
                  <div className="bg-blue-500 rounded-full h-2" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="ml-2">{progress}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <pre className="ml-[80px] mr-[24px] rounded-md">
        <code className="language-json">{code}</code>
      </pre>
    </main>
  );
}
